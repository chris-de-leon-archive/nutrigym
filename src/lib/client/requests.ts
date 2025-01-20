"use server"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { yoga } from "@nutrigym/lib/server/providers/yoga"
import { GraphQLClient } from "graphql-request"
import { GraphQLError, print } from "graphql"
import { auth } from "@clerk/nextjs/server"

type PersistedOpFields = Partial<{ __meta__: { hash: string } }>

const makeRequest = async <TResult, TVariables extends Record<string, unknown>>(
  document: TypedDocumentNode<TResult, TVariables> & PersistedOpFields,
  variables: TVariables,
) => {
  const { getToken } = await auth()
  const jwtToken = await getToken()
  const headers = {
    authorization: `bearer ${jwtToken}`,
  }

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
  })

  const result = await client.rawRequest<TResult, TVariables>(
    print(document),
    variables,
    headers,
  )

  const err = result.errors?.at(0)
  if (err != null) {
    return err
  } else {
    return result.data
  }
}

export const makeRequestOrThrow = async <
  TResult,
  TVariables extends Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables> & PersistedOpFields,
  variables: TVariables,
) => {
  const result = await makeRequest(document, variables)
  if (result instanceof GraphQLError) {
    throw result
  } else {
    return result
  }
}
