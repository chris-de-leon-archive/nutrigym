import { usePersistedOperations as withPersistedOperations } from "@graphql-yoga/plugin-persisted-operations"
import { useDisableIntrospection as disableIntrospection } from "@graphql-yoga/plugin-disable-introspection"
import { blockFieldSuggestionsPlugin } from "@escape.tech/graphql-armor-block-field-suggestions"
import { maxDirectivesPlugin } from "@escape.tech/graphql-armor-max-directives"
import { maxAliasesPlugin } from "@escape.tech/graphql-armor-max-aliases"
import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens"
import { costLimitPlugin } from "@escape.tech/graphql-armor-cost-limit"
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { clerk } from "@nutrigym/lib/server/providers/clerk"
import { env, IS_DEV_MODE } from "@nutrigym/lib/server/env"
import { schema } from "@nutrigym/lib/server/api/schema"
import { db } from "@nutrigym/lib/server/providers/db"
import { initContextCache } from "@pothos/core"
import { auth } from "@clerk/nextjs/server"
import { createYoga } from "graphql-yoga"
import {
  useResponseCache as withResponseCache,
  createInMemoryCache,
} from "@graphql-yoga/plugin-response-cache"

import PersistedDocuments from "../../../client/generated/persisted-documents.json"

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
// TODO: use redis cache
const cache = createInMemoryCache({
  max: 100,
})

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
    // Persisted documents: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#persisted-documents
    withPersistedOperations({
      skipDocumentValidation: true,
      getPersistedOperation(key: keyof typeof PersistedDocuments) {
        return PersistedDocuments[key]
      },
    }),

    // Security plugins: https://the-guild.dev/graphql/yoga-server/docs/prepare-for-production#public-api
    blockFieldSuggestionsPlugin(),
    disableIntrospection(),
    maxDirectivesPlugin(),
    maxAliasesPlugin(),
    maxTokensPlugin(),
    costLimitPlugin(),
    maxDepthPlugin(),

    // Response caching: https://the-guild.dev/graphql/envelop/plugins/use-response-cache#envelopresponse-cache
    withResponseCache<GraphQLBaseContext>({
      session: async () => await auth().then(({ userId }) => userId),
      includeExtensionMetadata: IS_DEV_MODE,
      ttl: IS_DEV_MODE ? undefined : 30_000,
      cache,
    }),
  ],
})
