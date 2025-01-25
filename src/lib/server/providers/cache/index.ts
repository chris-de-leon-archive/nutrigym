import { Cache, createInMemoryCache } from "@graphql-yoga/plugin-response-cache"
import { createRedisCache } from "@envelop/response-cache-redis"
import { env } from "../../env"
import { Redis } from "ioredis"

// NOTE: when a mutation is invoked, the response cache plugin will automatically
// invalidate the entities returned from the mutation using the __typename and ID
// fields. To ensure caching behavior works as expected, all mutations should return
// the affected entities along with their IDs. One edge case to consider includes
// creation mutations. Suppose that we have a query which lists multiple entities.
// If a new entity is created, the ID of the newly created entity will be invalidated.
// However, this newly created entity is not being used by any queries yet, so the
// invalidation does nothing. As a result, the original results of the list query
// will still remain cached and the newly created entity will not appear (until the
// ttl expires). To resolve this, mutations which create new entities should also
// invalidate all entities that have the same type as the newly created entity.
//
export const cache =
  env.CACHE_URL != null
    ? (createRedisCache({ redis: new Redis(env.CACHE_URL) }) as Cache)
    : createInMemoryCache({ max: 100 })
