import { schema } from "@nutrigym/lib/server/db/schema"
import { doPercentagesSumTo100 } from "../utils"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  allValuesUndefined,
  GraphQLAuthContext,
  asFatalZodError,
  stripNull,
} from "@nutrigym/lib/server/api"

const zInput = z
  .object({
    id: z.string().uuid(),
    data: z.object({
      waterInMilliliters: z.number().min(0).nullish(),
      weightInPounds: z.number().min(0).nullish(),
      sleepInHours: z.number().min(0).max(24).nullish(),
      proteinPercentage: z.number().min(0).max(100),
      carbsPercentage: z.number().min(0).max(100),
      fatPercentage: z.number().min(0).max(100),
      calories: z.number().min(0).nullish(),
      steps: z.number().int().min(0).nullish(),
    }),
  })
  .superRefine((arg, ctx) => {
    const err = doPercentagesSumTo100([
      arg.data.proteinPercentage,
      arg.data.carbsPercentage,
      arg.data.fatPercentage,
    ])
    if (err != null) {
      return asFatalZodError(ctx, err)
    }
  })

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (allValuesUndefined(input.data)) {
    return []
  }

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .update(schema.userGoal)
      .set({
        waterInMilliliters: stripNull(input.data.waterInMilliliters),
        weightInPounds: stripNull(input.data.weightInPounds),
        sleepInHours: stripNull(input.data.sleepInHours),
        proteinPercentage: input.data.proteinPercentage,
        carbsPercentage: input.data.carbsPercentage,
        fatPercentage: input.data.fatPercentage,
        calories: stripNull(input.data.calories),
        steps: stripNull(input.data.steps),
      })
      .where(
        and(
          eq(schema.userGoal.userId, ctx.auth.user.id),
          eq(schema.userGoal.id, input.id),
        ),
      )
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
