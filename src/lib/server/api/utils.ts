import { RefinementCtx, z } from "zod"

export type ParsedZodDateString = {
  month: number
  year: number
  day: number
}

export const allValuesUndefined = <T extends object>(obj: T) => {
  return Object.values(obj).every((v) => v === undefined)
}

export const stripNull = <T>(val: T | undefined | null) => {
  return val == null ? undefined : val
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
