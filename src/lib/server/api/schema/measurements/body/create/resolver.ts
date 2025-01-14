import { schema } from "@nutrigym/lib/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_CREATE_BODY_MEASUREMENT,
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
  ERR_NO_GOALS_SET,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  data: z.object({
    sleepInHours: z.number().min(0).max(24).nullish(),
    waterInMilliliters: z.number().min(0).nullish(),
    shouldersInInches: z.number().min(0).nullish(),
    forearmsInInches: z.number().min(0).nullish(),
    calvesInInches: z.number().min(0).nullish(),
    thighsInInches: z.number().min(0).nullish(),
    waistInInches: z.number().min(0).nullish(),
    chestInInches: z.number().min(0).nullish(),
    armsInInches: z.number().min(0).nullish(),
    neckInInches: z.number().min(0).nullish(),
    hipsInInches: z.number().min(0).nullish(),
    steps: z.number().int().min(0).nullish(),
    heightInInches: z.number().min(0),
    weightInPounds: z.number().min(0),
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
      .insert(schema.bodyMeasurement)
      .values({
        ...input.data,
        id: measurementId,
        logId: log.id,
      })
      .onConflictDoNothing()
  })

  if (resp.rowsAffected === 0) {
    throw ERR_CREATE_BODY_MEASUREMENT
  } else {
    return { id: measurementId }
  }
}
