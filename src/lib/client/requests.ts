"use server"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { yoga } from "@nutrigym/lib/server/providers/yoga"
import { GraphQLError, parse, print } from "graphql"
import { auth } from "@clerk/nextjs/server"
import {
  HTTPExecutorOptions,
  buildHTTPExecutor,
} from "@graphql-tools/executor-http"

export type RequestOptions = Omit<
  HTTPExecutorOptions,
  "fetch" | "endpoint" | "headers"
>

export const makeRequest = async <
  TResult,
  TVariables extends Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options?: RequestOptions,
) => {
  const { getToken } = await auth()

  // NOTE: it's also possible to use yoga.fetch, but you'd need to do some extra
  // work to parse the GraphQL responses. To avoid this, we use the HTTP executor
  // package. The only downside with the HTTP executor is that you don't get info
  // about the response status code or status text (the result is set to undefined)
  // which can make it harder to debug things.
  const executor = buildHTTPExecutor({
    ...(options ?? {}),
    endpoint: "http://yoga/graphql",
    fetch: yoga.fetch,
    headers: {
      authorization: `bearer ${await getToken()}`,
      "content-type": "application/json",
    },
  })

  const result = await executor<TResult, TVariables>({
    document: parse(print(document)),
    variables,
  })

  if (Symbol.asyncIterator in result) {
    throw new Error(
      "unexpectedly received more than one value from graphql response",
    )
  }

  const err = result.errors?.at(0)
  if (err != null) {
    return err
  }

  const data = result.data
  if (data == null) {
    throw new Error(`received no data: ${JSON.stringify(data, null, 2)}`)
  } else {
    return data
  }
}

export const makeRequestOrThrow = async <
  TResult,
  TVariables extends Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options?: RequestOptions,
) => {
  const result = await makeRequest(document, variables, options)
  if (result instanceof GraphQLError) {
    throw result
  } else {
    return result
  }
}
