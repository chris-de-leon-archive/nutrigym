import { useDisableIntrospection as withDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection"
import { usePersistedOperations as withPersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { withRequestID } from "@nutrigym/lib/server/api/plugins/request-id"
import { withLogger } from "@nutrigym/lib/server/api/plugins/logger"
import { tracer } from "@nutrigym/lib/server/api/providers/tracer"
import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { schema } from "@nutrigym/lib/server/api/schema"
import { initContextCache } from "@pothos/core"
import { env } from "@nutrigym/lib/server/env"
import { createYoga } from "graphql-yoga"

import PersistedDocuments from "../client/graphql/generated/persisted-documents.json"

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
        tracer,
        clerk,
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
  ],
})
