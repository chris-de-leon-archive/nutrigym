import { useDisableIntrospection as withDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection"
import { usePersistedOperations as withPersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { useResponseCache as withResponseCache } from "@graphql-yoga/plugin-response-cache"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { clerk } from "@nutrigym/lib/server/providers/clerk"
import { env, IS_DEV_MODE } from "@nutrigym/lib/server/env"
import { schema } from "@nutrigym/lib/server/api/schema"
import { db } from "@nutrigym/lib/server/providers/db"
import { initContextCache } from "@pothos/core"
import { auth } from "@clerk/nextjs/server"
import { createYoga } from "graphql-yoga"
import { cache } from "../cache"

import PersistedDocuments from "../../../client/generated/persisted-documents.json"

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
      includeExtensionMetadata: IS_DEV_MODE,
      ttl: IS_DEV_MODE ? undefined : 30_000,
      cache,
    }),
  ],
})
