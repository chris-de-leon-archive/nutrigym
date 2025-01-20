import { stripNull } from "@nutrigym/lib/utils"
import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_UPDATE_FOOD_MEASUREMENT,
  isValidUpdateObject,
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  date: z.date(),
  data: z.object({
    servingsConsumed: z.number().min(0).nullish(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (isValidUpdateObject(input.data)) {
    return null
  }

  const resp = await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.month, input.date.getUTCMonth()),
        eq(schema.userMeasurementLog.year, input.date.getUTCFullYear()),
        eq(schema.userMeasurementLog.day, input.date.getUTCDay()),
      ),
    })
    if (log == null) {
      throw ERR_LOG_NOT_FOUND
    }

    return await tx
      .update(schema.foodMeasurement)
      .set({
        ...input.data,
        servingsConsumed: stripNull(input.data.servingsConsumed),
      })
      .where(
        and(
          eq(schema.foodMeasurement.logId, log.id),
          eq(schema.foodMeasurement.id, input.id),
        ),
      )
  })

  if (resp.rowsAffected === 0) {
    throw ERR_UPDATE_FOOD_MEASUREMENT
  } else {
    return null
  }
}
