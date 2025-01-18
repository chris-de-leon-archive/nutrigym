import { schema } from "@nutrigym/lib/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_CREATE_FOOD_MEASUREMENT,
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
  ERR_NO_GOALS_SET,
  ERR_CREATE_FOOD,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  date: z.date(),
  data: z.object({
    servingsConsumed: z.number().min(0),
    food: z.object({
      name: z.string().min(1),
      brand: z.string().min(1),
      calories: z.number().min(0),
      servingSize: z.number().min(0),
      servingUnit: z.string().min(1),
      totalProteinInGrams: z.number().min(0).nullish(),
      totalCarbsInGrams: z.number().min(0).nullish(),
      totalFatInGrams: z.number().min(0).nullish(),
      polyunsaturatedFatInGrams: z.number().min(0).nullish(),
      monounsaturatedFatInGrams: z.number().min(0).nullish(),
      saturatedFatInGrams: z.number().min(0).nullish(),
      potassiumInMilligrams: z.number().min(0).nullish(),
      sodiumInMilligrams: z.number().min(0).nullish(),
      dietaryFiberInGrams: z.number().min(0).nullish(),
      sugarsInGrams: z.number().min(0).nullish(),
      cholesterolInMilligrams: z.number().min(0).nullish(),
      calciumInMilligrams: z.number().min(0).nullish(),
      ironInMilligrams: z.number().min(0).nullish(),
    }),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const measurementLogId = randomUUID()
  const measurementId = randomUUID()
  const foodId = randomUUID()
  const userId = ctx.auth.user.id
  const month = input.date.getUTCMonth()
  const year = input.date.getUTCFullYear()
  const day = input.date.getUTCDay()

  const resp = await ctx.providers.db.transaction(async (tx) => {
    const food = await tx
      .insert(schema.userFood)
      .values({
        ...input.data.food,
        id: foodId,
        userId,
      })
      .onConflictDoNothing()
    if (food.rowsAffected === 0) {
      throw ERR_CREATE_FOOD
    }

    const goal = await tx.query.userGoal.findFirst({
      where: and(
        eq(schema.userGoal.userId, userId),
        eq(schema.userGoal.latest, true),
      ),
    })
    if (goal == null) {
      throw ERR_NO_GOALS_SET
    }

    await tx
      .insert(schema.userMeasurementLog)
      .values({
        id: measurementLogId,
        goalId: goal.id,
        userId,
        month,
        year,
        day,
      })
      .onConflictDoNothing()

    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, userId),
        eq(schema.userMeasurementLog.month, month),
        eq(schema.userMeasurementLog.year, year),
        eq(schema.userMeasurementLog.day, day),
      ),
    })
    if (log == null) {
      throw ERR_LOG_NOT_FOUND
    }

    return await tx
      .insert(schema.foodMeasurement)
      .values({
        servingsConsumed: input.data.servingsConsumed,
        id: measurementId,
        logId: log.id,
        foodId,
      })
      .onConflictDoNothing()
  })

  if (resp.rowsAffected === 0) {
    throw ERR_CREATE_FOOD_MEASUREMENT
  } else {
    return { id: measurementId }
  }
}
