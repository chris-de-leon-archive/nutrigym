import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { assertPercentagesSumTo100 } from "../utils"
import { schema } from "@nutrigym/lib/schema"
import { randomUUID } from "node:crypto"
import { types } from "../types"
import { z } from "zod"

export const zInput = z
  .object({
    date: z.date(),
    data: z.object({
      waterInMilliliters: z.number().min(0),
      weightInPounds: z.number().min(0),
      sleepInHours: z.number().min(0).max(24),
      proteinPercentage: z.number().min(0).max(100),
      carbsPercentage: z.number().min(0).max(100),
      fatPercentage: z.number().min(0).max(100),
      calories: z.number().min(0),
      steps: z.number().int().min(0),
    }),
  })
  .superRefine((arg, ctx) => {
    const err = assertPercentagesSumTo100([
      arg.data.proteinPercentage,
      arg.data.carbsPercentage,
      arg.data.fatPercentage,
    ])
    if (err != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: err.message,
        fatal: true,
      })
      return z.NEVER
    }
  })

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  await ctx.providers.cache.invalidate([{ typename: types.goal.name }])

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .insert(schema.userGoal)
      .values({
        ...input.data,
        userId: ctx.auth.user.id,
        month: input.date.getUTCMonth(),
        year: input.date.getUTCFullYear(),
        day: input.date.getUTCDate(),
        id: randomUUID(),
      })
      .onConflictDoNothing()
      .returning()
  })
}
