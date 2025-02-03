import { GraphQLParams } from "graphql-yoga"
import { RefinementCtx, z } from "zod"
import * as crypto from "node:crypto"

export type ParsedZodDateString = {
  month: number
  year: number
  day: number
}

export const defineOperationResolver = <TInput, THandler>(info: {
  input: TInput
  handler: THandler
}) => {
  return info
}

export const defineOperationSchema = <TInputs>(info: {
  name: string
  input: TInputs
}) => {
  return info
}

export const defineOperation = <TTypes, TResolver>(info: {
  resolver: TResolver
  schema: TTypes
}) => {
  return info
}

export const defineTypes = <TObjects, TInputs>(info: {
  objects: TObjects
  inputs: TInputs
}) => {
  return info
}

export const defineModule = <TOperations, TTypes>(info: {
  operations: TOperations
  types: TTypes
}) => {
  return info
}

export const allValuesUndefined = <T extends object>(obj: T) => {
  return Object.values(obj).every((v) => v === undefined)
}

export const stripNull = <T>(val: T | undefined | null) => {
  return val == null ? undefined : val
}

export const hashGqlParams = (params: GraphQLParams, alg = "md5") => {
  const { query, variables } = params
  if (query == null) {
    throw new Error(
      "failed to hash graphql params - query string cannot be null or undefined",
    )
  }

  return crypto
    .createHash(alg)
    .update(query)
    .update(JSON.stringify(variables))
    .digest()
    .toString("hex")
}

export const compareDates = (
  date: ParsedZodDateString,
  other: ParsedZodDateString,
) => {
  return (
    date.year - other.year || date.month - other.month || date.day - other.day
  )
}

export const countDays = (
  startInc: ParsedZodDateString,
  finalInc: ParsedZodDateString,
) => {
  const startDate = Date.UTC(startInc.year, startInc.month, startInc.day)
  const finalDate = Date.UTC(finalInc.year, finalInc.month, finalInc.day)
  return 1 + (finalDate - startDate) / 1000 / 60 / 60 / 24
}

export const asFatalZodError = (ctx: RefinementCtx, err: Error) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: err.message,
    fatal: true,
  })
  return z.NEVER
}

export const parseZodDateString = (date: string): ParsedZodDateString => {
  // NOTE: https://zod.dev/?id=strings
  const [year, month, day] = date.split("-")
  return {
    month: parseInt(month, 10) - 1,
    year: parseInt(year, 10),
    day: parseInt(day, 10),
  }
}
