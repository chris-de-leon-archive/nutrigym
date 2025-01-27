import { FormattedExecutionResult, GraphQLFormattedError } from "graphql"
import { performance } from "node:perf_hooks"
import { env } from "./env"
import { z } from "zod"

export const logRequest = (requestID: string, args: RequestInit) => {
  if (env.IS_DEV_MODE) {
    console.log(
      `\x1b[36m[${requestID}]\x1b[0m => \x1b[32m${JSON.stringify(args)}\x1b[0m`,
    )
  }
}

export const logResponse = (
  requestID: string,
  dur: number,
  status: number,
  body: unknown,
) => {
  const duration = dur.toString().concat("ms")
  if (env.IS_DEV_MODE) {
    console.log(
      `\x1b[36m[${requestID}]\x1b[0m <= \x1b[35m${JSON.stringify({ duration, status, body })}\x1b[0m`,
    )
  }
}

export const timeit = <
  TArgs,
  TTransformedArgs,
  TResult,
  TTransformedResult,
>(opts: {
  before: (args: TArgs) => Promise<TTransformedArgs> | TTransformedArgs
  fn: (args: TTransformedArgs) => Promise<TResult> | TResult
  after: (
    res: TResult,
    dur: number,
  ) => Promise<TTransformedResult> | TTransformedResult
}) => {
  return async (args: TArgs) => {
    const a = await opts.before(args)
    const s = performance.now()
    const r = await opts.fn(a)
    const f = performance.now()
    return await opts.after(r, f - s)
  }
}

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
