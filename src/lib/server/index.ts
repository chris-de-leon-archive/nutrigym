"use server"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { OperationDefinitionNode } from "graphql"
import { yoga } from "@nutrigym/lib/server/yoga"
import {
  handleExecutionResult,
  parseExecutionResult,
  readResponseBody,
} from "./utils"

type PersistedOpFields = Partial<{ __meta__: { hash: string } }>

export const makeRequestOrThrow = async <
  TResult,
  TVariables extends Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables> & PersistedOpFields,
  variables: TVariables,
) => {
  const opDefn = document.definitions.at(0)
  if (opDefn == null) {
    throw new Error(
      "failed to extract operation definition node from typed document node",
    )
  }

  const opName = (opDefn as OperationDefinitionNode).name?.value
  if (opName == null) {
    throw new Error("failed to extract operation name from typed document node")
  }

  const opHash = document.__meta__?.hash
  if (opHash == null) {
    throw new Error(
      "failed to extract persisted query hash from typed document node",
    )
  }

  const res = await yoga.fetch("http://yoga/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      operationName: opName,
      variables,
      extensions: {
        persistedQuery: {
          sha256Hash: opHash,
          version: 1,
        },
      },
    }),
  })

  const body = await readResponseBody(res)
  const exec = parseExecutionResult<TResult>(body)
  return handleExecutionResult<TResult>(exec)
}
