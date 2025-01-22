"use server"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { yoga } from "@nutrigym/lib/server/providers/yoga"
import { IS_DEV_MODE } from "@nutrigym/lib/server/env"
import { GraphQLClient } from "graphql-request"
import { print } from "graphql"

type PersistedOpFields = Partial<{ __meta__: { hash: string } }>

export const makeRequestOrThrow = async <
  TResult,
  TVariables extends Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables> & PersistedOpFields,
  variables: TVariables,
) => {
  const client = new GraphQLClient("http://yoga/graphql", {
    fetch: yoga.fetch as typeof fetch,
    requestMiddleware: (req) => {
      const hash = document.__meta__?.hash
      return hash == null
        ? req
        : {
            ...req,
            body: JSON.stringify({
              operationName: req.operationName,
              variables: req.variables,
              extensions: {
                persistedQuery: {
                  sha256Hash: hash,
                  version: 1,
                },
              },
            }),
          }
    },
    responseMiddleware: (res) => {
      if (IS_DEV_MODE) {
        console.log("Response:", JSON.stringify(res))
      }
    },
  })

  const result = await client.rawRequest<TResult, TVariables>(
    print(document),
    variables,
  )

  const err = result.errors?.at(0)
  if (err != null) {
    throw result
  } else {
    return result.data
  }
}
