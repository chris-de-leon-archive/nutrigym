import { schema } from "@nutrigym/lib/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_CREATE_FOOD_MEASUREMENT,
  GraphQLAuthContext,
  ERR_FOOD_NOT_FOUND,
  ERR_LOG_NOT_FOUND,
  ERR_NO_GOALS_SET,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  data: z.object({
    servingsConsumed: z.number().min(0),
    food: z.object({
      id: z.string().uuid(),
    }),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const measurementLogId = randomUUID()
  const measurementId = randomUUID()
  const userId = ctx.auth.user.id
  const month = ctx.date.getUTCMonth()
  const year = ctx.date.getUTCFullYear()
  const day = ctx.date.getUTCDay()

  const resp = await ctx.providers.db.transaction(async (tx) => {
    const food = await tx.query.userFood.findFirst({
      where: and(
        eq(schema.userFood.userId, userId),
        eq(schema.userFood.id, input.data.food.id),
      ),
    })
    if (food == null) {
      throw ERR_FOOD_NOT_FOUND(input.data.food.id)
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
        foodId: input.data.food.id,
        id: measurementId,
        logId: log.id,
      })
      .onConflictDoNothing()
  })

  if (resp.rowsAffected === 0) {
    throw ERR_CREATE_FOOD_MEASUREMENT
  } else {
    return { id: measurementId }
  }
}
