import { ExecutionResult, getOperationAST, OperationTypeNode } from "graphql"
import { collectEntities, collectInvalidations } from "./utils"
import { GraphQLBaseContext } from "../../types"
import { redis } from "../../providers/redis"
import { hashGqlParams } from "../../utils"
import { UserCacheKey } from "./keys"
import { Plugin } from "graphql-yoga"
import * as ast from "./ast"

type CacheConfig = {
  session: () => Promise<string | null>
  client: typeof redis
}

// What data structures are being used in Redis per user?
//
//   1. {userID}:cache => a redis hash that maps the cache key (e.g. `md5(GqlParams)`) to its JSON response
//   2. {userID}:{typename}:{id} => a redis set which connects each entity to its corresponding cache keys
//   3. {userID}:{typename} => a redis set which maps each typename to its corresponding IDs
//
// Why are these redis data structures needed for each user?
//
//   1. {userID}:cache => this is the cache itself
//   2. {userID}:{typename}:{id} => this allows us to invalidate cache keys by { typename, id } pair
//   3. {userID}:{typename} => this allows us to bulk delete cache keys by typename
//
// When should things be cached?
//
//   Query results are saved to the cache - mutations are never cached
//
export function withGqlCachePlugin(
  config: CacheConfig,
): Plugin<GraphQLBaseContext> {
  return {
    onExecute: async (onExecuteOptions) => {
      const userID = await config.session()
      if (userID == null) {
        return
      }

      const operationAST = getOperationAST(
        onExecuteOptions.args.document,
        onExecuteOptions.args.operationName,
      )

      if (operationAST == null) {
        return onExecuteOptions.executeFn(onExecuteOptions.args)
      }

      const cacheKey = hashGqlParams(
        onExecuteOptions.args.contextValue.yoga.params,
      )

      let hit = false
      if (operationAST.operation === OperationTypeNode.QUERY) {
        const raw = await config.client.hget(UserCacheKey(userID), cacheKey)
        if (raw != null) {
          const val = JSON.parse(raw) as ExecutionResult
          onExecuteOptions.setResultAndStopExecution({
            ...val,
            extensions: {
              ...val.extensions,
              cache: {
                key: cacheKey,
                hit: (hit = true),
              },
            },
          })
          return
        }
      }

      // this will add typenames to the execution result which
      // is needed for both response caching and invalidations
      onExecuteOptions.setExecuteFn((args) => {
        return onExecuteOptions.executeFn({
          ...args,
          document: ast.addTypenameToDocument(args.schema, args.document),
        })
      })

      return {
        onExecuteDone: async (onExecuteDoneOptions) => {
          // extract helper variables
          const {
            result,
            args: { contextValue: ctx },
          } = onExecuteDoneOptions

          // caching is not applicable for subscriptions or if there's no data
          if (
            operationAST.operation === OperationTypeNode.SUBSCRIPTION ||
            Symbol.asyncIterator in result ||
            result.data == null
          ) {
            return
          }

          // response caching is only applicable for queries
          if (operationAST.operation === OperationTypeNode.QUERY && !hit) {
            const entities = collectEntities(result.data).flatMap(
              ({ id, typename }) => [typename, id.toString()],
            )

            if (entities.length > 0) {
              await config.client.cache(
                userID,
                cacheKey,
                JSON.stringify(result),
                ...entities,
              )
            }

            onExecuteDoneOptions.setResult({
              ...result,
              extensions: {
                ...result.extensions,
                cache: {
                  cached: entities.length,
                  key: cacheKey,
                },
              },
            })
          }

          // cache invalidations are only applicable for mutations
          if (operationAST.operation === OperationTypeNode.MUTATION) {
            const invalidations = collectInvalidations(ctx).flatMap(
              ({ id, typename }) => [typename, id?.toString() ?? "*"],
            )

            await config.client.invalidate(userID, ...invalidations)

            onExecuteDoneOptions.setResult({
              ...result,
              extensions: {
                ...result.extensions,
                cache: {
                  invalidated: invalidations.length,
                  key: cacheKey,
                },
              },
            })
          }
        },
      }
    },
  }
}
