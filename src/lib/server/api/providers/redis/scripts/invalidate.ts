import { Result } from "ioredis"

// https://github.com/redis/ioredis/blob/ec42c82ceab1957db00c5175dfe37348f1856a93/examples/typescript/scripts.ts#L12
declare module "ioredis" {
  interface RedisCommander<Context> {
    invalidate(userId: string, ...argv: string[]): Result<string, Context>
  }
}

export const invalidate = {
  numberOfKeys: 1,
  lua: `
    local user_id = KEYS[1]
    local groups = {}

    for i = 1, #ARGV, 2 do
      local identifer = ARGV[i + 1]
      local typename = ARGV[i]
      if identifer == "*" then
        groups[typename] = user_id .. ":" .. typename .. ":*"
      elseif groups[typename] == nil then
        groups[typename] = { user_id .. ":" .. typename .. ":" .. identifer }
      elseif type(groups[typename]) == "table" then
        table.insert(groups[typename], user_id .. ":" .. typename .. ":" .. identifer)
      end
    end

    local invalidations_set = {}
    local invalidations = {}
    local deletions_set = {}
    local deletions = {}
    for typename, entities in pairs(groups) do
      local user_entities = user_id .. ":" .. typename

      local entity_keys = {}
      if type(entities) == "string" then
        entity_keys = redis.call("SMEMBERS", user_entities)
      else
        entity_keys = entities
      end

      for _, entity_key in ipairs(entity_keys) do
        local cache_keys = redis.call("SMEMBERS", entity_key)
        for _, cache_key in ipairs(cache_keys) do
          if invalidations_set[cache_key] == nil then
            table.insert(invalidations, cache_key)
            invalidations_set[cache_key] = true
          end
        end
        if deletions_set[entity_key] == nil then
          table.insert(deletions, entity_key)
          deletions_set[entity_key] = true
        end
      end

      if #entity_keys > 0 then
        redis.call("SREM", user_entities, unpack(entity_keys))
      end
    end

    if #invalidations > 0 then
      local user_cache = user_id .. ":cache"
      redis.call("HDEL", user_cache, unpack(invalidations))
    end

    if #deletions > 0 then
      redis.call("DEL", unpack(deletions))
    end
  `,
}
