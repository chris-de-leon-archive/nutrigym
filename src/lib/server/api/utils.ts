import { RefinementCtx, z } from "zod"

export const allValuesUndefined = <T extends object>(obj: T) => {
  return Object.values(obj).every((v) => v === undefined)
}

export const asFatalZodError = (ctx: RefinementCtx, err: Error) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: err.message,
    fatal: true,
  })
  return z.NEVER
}

export const parseZodDateString = (date: string) => {
  // NOTE: https://zod.dev/?id=strings
  const [year, month, day] = date.split("-")
  return {
    month: parseInt(month, 10) - 1,
    year: parseInt(year, 10),
    day: parseInt(day, 10),
  }
}
