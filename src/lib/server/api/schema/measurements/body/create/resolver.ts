import { GraphQLAuthContext, ERR_LOG_NOT_FOUND } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"

export const zInput = z.object({
  date: z.string().date(),
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
  const date = input.date

  await ctx.providers.cache.invalidate([
    { typename: types.bodyMeasurement.name },
  ])

  return await ctx.providers.db.transaction(async (tx) => {
    await tx
      .insert(schema.userMeasurementLog)
      .values({
        id: measurementLogId,
        userId,
        date,
      })
      .onConflictDoNothing()

    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, userId),
        eq(schema.userMeasurementLog.date, date),
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
      .returning()
  })
}
