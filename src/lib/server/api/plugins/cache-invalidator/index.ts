import { CacheEntityRecord } from "../../providers/cache-invalidator"
import { GraphQLBaseContext } from "../../types"
import { Plugin } from "graphql-yoga"

export function withCacheInvalidatorPlugin(): Plugin<GraphQLBaseContext> {
  return {
    onExecute() {
      return {
        onExecuteDone: async ({
          args: {
            contextValue: {
              yoga: { request },
              providers,
            },
          },
        }) => {
          const state = providers.invalidator.state(request)
          const buffr = new Array<CacheEntityRecord>()

          buffr.push(...(state.invalidations ?? []))
          providers.tracer.get(request)?.forEach((t) => {
            buffr.push(...(state.dependencies.get(t.info.fieldName) ?? []))
          })

          await providers.cache.invalidate(buffr)
        },
      }
    },
  }
}
