import { FormattedExecutionResult, GraphQLFormattedError } from "graphql"
import { z } from "zod"

export const readResponseBody = async (res: Response) => {
  if (!res.ok) {
    throw new Error(await res.text())
  } else {
    return await res.json()
  }
}

export const parseExecutionResult = <
  TData = Record<string, unknown>,
  TExtensions = Record<string, unknown>,
>(
  obj: unknown,
): FormattedExecutionResult<TData, TExtensions> => {
  const zGraphQLFormattedError = z.object({
    message: z.string(),
    locations: z.object({ line: z.number(), column: z.number() }).array(),
    path: z.union([z.string(), z.number()]).array(),
    extensions: z.record(z.unknown()),
  }) satisfies z.ZodType<GraphQLFormattedError>

  const zFormattedExecutionResult = z.object({
    errors: zGraphQLFormattedError.array().optional(),
    extensions: z.custom<TExtensions>().optional(),
    data: z.custom<TData | null>().optional(),
  }) satisfies z.ZodType<FormattedExecutionResult<TData, TExtensions>>

  return zFormattedExecutionResult.parse(obj)
}

export const handleExecutionResult = <
  TData = Record<string, unknown>,
  TExtensions = Record<string, unknown>,
>(
  res: FormattedExecutionResult<TData, TExtensions>,
) => {
  const err = res.errors?.at(0)
  if (err != null) {
    throw err
  }

  const dat = res.data
  if (dat == null) {
    throw new Error("unexpectedly received no data in graphql execution result")
  }

  return dat
}
