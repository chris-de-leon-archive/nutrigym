import { Result } from "ioredis"

// https://github.com/redis/ioredis/blob/ec42c82ceab1957db00c5175dfe37348f1856a93/examples/typescript/scripts.ts#L12
declare module "ioredis" {
  interface RedisCommander<Context> {
    cache(
      userId: string,
      ckey: string,
      data: string,
      ...argv: string[]
    ): Result<string, Context>
  }
}

export const cache = {
  numberOfKeys: 3,
  lua: `
    local user_id = KEYS[1]
    local ckey = KEYS[2]
    local data = KEYS[3]

    redis.call("HSET", user_id .. ":cache", ckey, data)

    local mapping = {}
    for i = 1, #ARGV, 2 do
      local identifier = ARGV[i + 1]
      local typename = ARGV[i]

      local entities_key = user_id .. ":" .. typename
      local entity_key = entities_key .. ":" .. identifier
      if mapping[entities_key] == nil then
        mapping[entities_key] = { entity_key }
      else
        table.insert(mapping[entities_key], entity_key)
      end

      redis.call("SADD", entity_key, ckey)
    end

    for entities_key, entity_keys in pairs(mapping) do
      redis.call("SADD", entities_key, unpack(entity_keys))
    end
  `,
}
