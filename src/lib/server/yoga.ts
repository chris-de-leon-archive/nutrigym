import { useDisableIntrospection as withDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection"
import { usePersistedOperations as withPersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { useResponseCache as withResponseCache } from "@graphql-yoga/plugin-response-cache"
import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { schema } from "@nutrigym/lib/server/api/schema"
import { cache } from "./api/providers/cache"
import { initContextCache } from "@pothos/core"
import { env } from "@nutrigym/lib/server/env"
import { auth } from "@clerk/nextjs/server"
import { createYoga } from "graphql-yoga"

import PersistedDocuments from "../client/graphql/generated/persisted-documents.json"

export const yoga = createYoga({
  fetchAPI: { Response },
  landingPage: false,
  schema,
  context: (yoga): GraphQLBaseContext => {
    const date = new Date()
    return {
      // Adding this will prevent any issues if you server implementation copies
      // or extends the context object before passing it to your resolvers
      ...initContextCache(),
      date,
      yoga,
      env,
      providers: {
        clerk,
        cache,
        db,
      },
    }
  },
  plugins: [
    // Disable introspection: https://the-guild.dev/graphql/yoga-server/docs/features/introspection
    withDisableIntrospection(),

    // Persisted documents: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#persisted-documents
    withPersistedOperations({
      skipDocumentValidation: true,
      getPersistedOperation(key: keyof typeof PersistedDocuments) {
        return PersistedDocuments[key]
      },
    }),

    // Response caching: https://the-guild.dev/graphql/envelop/plugins/use-response-cache#envelopresponse-cache
    withResponseCache<GraphQLBaseContext>({
      session: async () => await auth().then(({ userId }) => userId),
      includeExtensionMetadata: env.IS_DEV_MODE,
      ttl: env.IS_DEV_MODE ? undefined : 30_000,
      cache,
    }),
  ],
})
