import { Cache, createInMemoryCache } from "@graphql-yoga/plugin-response-cache"
import { createRedisCache } from "@envelop/response-cache-redis"
import { env } from "@nutrigym/lib/server/env"
import { Redis } from "ioredis"

// NOTE: if `invalidateViaMutation` is enabled, then the graphql-yoga response cache
// plugin will automatically invalidate the entities returned from a mutation using a
// combo of the __typename and ID fields. While this works well for simple use-cases,
// it can get fairly restrictive: (1) it forces us to return entities from mutations,
// (2) it does not work for creation mutations, and (3) if we have to do more complex
// invalidations, then this will result in more requests being sent to the cache which
// can slow things down. For #1, some databases don't support the `RETURNING` keyword,
// which will result in extra queries being sent to the database. For #2, suppose that
// we have a query which reads and returns multiple entities to the caller. If a new
// entity is created, then the ID of the new entity will be invalidated. However, this
// new entity is not being used anywhere yet, so the invalidation will do nothing. As a
// result, the original results of the read query will still remain cached and the new
// entity will not appear (until the ttl expires if it is configured). To resolve this,
// we need to ensure that any mutation which creates new entities also invalidate all
// entities that have the same type as the newly created entity. For #3, it'd be a lot
// more performant to collect a list of the invalidations that need to be performed, and
// execute a single request to remove them in one batch to keep things efficient. With
// these limitations in mind, we have disabled `invalidateViaMutation` so that we can
// handle cache invalidation manually.
//
export const cache =
  env.CACHE_URL != null
    ? (createRedisCache({ redis: new Redis(env.CACHE_URL) }) as Cache)
    : createInMemoryCache({ max: 100 })
