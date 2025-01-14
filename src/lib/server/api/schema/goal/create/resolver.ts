import { schema } from "@nutrigym/lib/schema"
import { makeVersionHash } from "../utils"
import { randomUUID } from "node:crypto"
import { eq } from "drizzle-orm"
import { z } from "zod"
import {
  GraphQLAuthContext,
  ERR_CREATE_GOAL,
  TOLERANCE,
} from "@nutrigym/lib/server/api"

export const zInput = z
  .object({
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
    const { proteinPercentage, carbsPercentage, fatPercentage } = arg.data
    const percentages = [proteinPercentage, carbsPercentage, fatPercentage]
    const total = percentages.reduce((agg, val) => agg + val, 0)
    if (Math.abs(total - 100) >= TOLERANCE) {
      ctx.addIssue({
        message: `percentages must sum to 100 (got ${total})`,
        code: z.ZodIssueCode.custom,
        fatal: true,
      })
      return z.NEVER
    }
  })

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const uuid = randomUUID()

  const resp = await ctx.providers.db.transaction(async (tx) => {
    await tx
      .update(schema.userGoal)
      .set({ latest: false })
      .where(eq(schema.userGoal.userId, ctx.auth.user.id))

    return await tx
      .insert(schema.userGoal)
      .values({
        waterInMilliliters: input.data.waterInMilliliters,
        weightInPounds: input.data.weightInPounds,
        sleepInHours: input.data.sleepInHours,
        proteinPercentage: input.data.proteinPercentage,
        carbsPercentage: input.data.carbsPercentage,
        fatPercentage: input.data.fatPercentage,
        calories: input.data.calories,
        version: makeVersionHash(input.data),
        steps: input.data.steps,
        userId: ctx.auth.user.id,
        latest: true,
        id: uuid,
      })
      .onConflictDoUpdate({
        target: [schema.userGoal.userId, schema.userGoal.version],
        set: { latest: true },
      })
  })

  if (resp.rowsAffected === 0) {
    throw ERR_CREATE_GOAL
  } else {
    return { id: uuid }
  }
}
