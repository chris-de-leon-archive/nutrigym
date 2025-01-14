"use client";

import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ExecutableDefinitionNode } from "graphql";
import { makeRequestOrThrow } from "./requests";
import { useAuth } from "@clerk/nextjs";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

type GetTokenFn = ReturnType<typeof useAuth>["getToken"];

export function useGraphQLQuery<
  TResult,
  TVariables extends Record<string, unknown> | undefined,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  getToken: GetTokenFn,
  options: Partial<
    Omit<
      UseQueryOptions<TResult, Error, TResult, unknown[]>,
      "queryKey" | "queryFn"
    >
  > = {},
) {
  const docName = (document.definitions.at(0) as ExecutableDefinitionNode)?.name
    ?.value;
  return useQuery({
    ...options,
    queryKey: [docName, document, variables],
    queryFn: async () => {
      return await makeRequestOrThrow(document, variables, await getToken());
    },
  });
}

export function useGraphQLMutation<
  TResult,
  TVariables extends Record<string, unknown> | undefined,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  getToken: GetTokenFn,
  options: Partial<
    Omit<UseMutationOptions<TResult, Error, TVariables, unknown>, "mutationFn">
  > = {},
) {
  return useMutation({
    ...options,
    mutationFn: async (variables: TVariables) => {
      return await makeRequestOrThrow(document, variables, await getToken());
    },
  });
}
