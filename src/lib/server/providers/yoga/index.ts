import { maxDirectivesPlugin } from "@escape.tech/graphql-armor-max-directives"
import { maxAliasesPlugin } from "@escape.tech/graphql-armor-max-aliases"
import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens"
import { costLimitPlugin } from "@escape.tech/graphql-armor-cost-limit"
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth"
import { GraphQLBaseContext } from "@nutrigym/lib/server/api"
import { clerk } from "@nutrigym/lib/server/providers/clerk"
import { schema } from "@nutrigym/lib/server/api/schema"
import { db } from "@nutrigym/lib/server/providers/db"
import { initContextCache } from "@pothos/core"
import { env } from "@nutrigym/lib/server/env"
import { createYoga } from "graphql-yoga"

export const yoga = createYoga({
  fetchAPI: { Response },
  schema,
  context: async (yoga): Promise<GraphQLBaseContext> => {
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
        db,
      },
    }
  },
  plugins: [
    // Security plugins: https://the-guild.dev/graphql/yoga-server/docs/prepare-for-production#public-api
    maxDirectivesPlugin(),
    maxAliasesPlugin(),
    maxTokensPlugin(),
    costLimitPlugin(),
    maxDepthPlugin(),
  ],
})
