import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_LOG_NOT_FOUND,
  ERR_NO_GOALS_SET,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  date: z.date(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const userId = ctx.auth.user.id
  const month = input.date.getUTCMonth()
  const year = input.date.getUTCFullYear()
  const day = input.date.getUTCDay()

  return await ctx.providers.db.transaction(async (tx) => {
    const goal = await tx.query.userGoal.findFirst({
      where: and(
        eq(schema.userGoal.userId, userId),
        eq(schema.userGoal.latest, true),
      ),
    })
    if (goal == null) {
      throw ERR_NO_GOALS_SET
    }

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

    return await tx.query.foodMeasurement.findMany({
      where: eq(schema.foodMeasurement.logId, log.id),
    })
  })
}
