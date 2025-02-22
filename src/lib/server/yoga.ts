import { useDisableIntrospection as withDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection"
import { usePersistedOperations as withPersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { useResponseCache as withResponseCache } from "@graphql-yoga/plugin-response-cache"
import { withGqlCachePlugin } from "@nutrigym/lib/server/api/plugins/cache-invalidator"
import { invalidator } from "@nutrigym/lib/server/api/providers/cache-invalidator"
import { withRequestID } from "@nutrigym/lib/server/api/plugins/request-id"
import { withLogger } from "@nutrigym/lib/server/api/plugins/logger"
import { tracer } from "@nutrigym/lib/server/api/providers/tracer"
import { cache } from "@nutrigym/lib/server/api/providers/cache"
import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { schema } from "@nutrigym/lib/server/api/schema"
import { initContextCache } from "@pothos/core"
import { env } from "@nutrigym/lib/server/env"
import { auth } from "@clerk/nextjs/server"
import { createYoga } from "graphql-yoga"

import PersistedDocuments from "../client/graphql/generated/persisted-documents.json"
import { redis } from "./api/providers/redis"

export const yoga = createYoga({
  fetchAPI: { Response },
  landingPage: false,
  graphiql: false,
  batching: false,
  schema,
  context: (yoga): GraphQLBaseContext => {
    return {
      // Adding this will prevent any issues if you server implementation copies
      // or extends the context object before passing it to your resolvers
      ...initContextCache(),
      date: new Date(),
      yoga,
      env,
      providers: {
        invalidator,
        tracer,
        clerk,
        cache,
        db,
      },
    }
  },
  plugins: [
    // Add a request ID to the request headers
    withRequestID(),

    // Disable introspection: https://the-guild.dev/graphql/yoga-server/docs/features/introspection
    withDisableIntrospection(),

    // Request logging
    withLogger({ enabled: env.IS_DEV_MODE }),

    // Persisted documents: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#persisted-documents
    withPersistedOperations({
      skipDocumentValidation: true,
      getPersistedOperation(key: keyof typeof PersistedDocuments) {
        return PersistedDocuments[key]
      },
    }),

    // TODO: this plugin is very inconsistent and should be removed
    // Instead we can just implement our own caching solution
    // Response caching: https://the-guild.dev/graphql/envelop/plugins/use-response-cache#envelopresponse-cache
    withResponseCache<GraphQLBaseContext>({
      session: async () => await auth().then(({ userId }) => userId),
      includeExtensionMetadata: env.IS_DEV_MODE,
      ttl: env.IS_DEV_MODE ? undefined : 30_000,
      invalidateViaMutation: false,
      enabled: () => false,
      cache,
    }),

    // Cache invalidation
    withGqlCachePlugin({
      session: async () => await auth().then(({ userId }) => userId),
      client: redis,
    }),
  ],
})
