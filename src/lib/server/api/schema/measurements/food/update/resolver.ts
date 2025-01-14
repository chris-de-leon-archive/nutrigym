import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
  isValidUpdateObject,
  stripNull,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    servingsConsumed: z.number().min(0).nullish(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (isValidUpdateObject(input.data)) {
    return { count: 0 }
  }

  const resp = await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.month, ctx.date.getUTCMonth()),
        eq(schema.userMeasurementLog.year, ctx.date.getUTCFullYear()),
        eq(schema.userMeasurementLog.day, ctx.date.getUTCDay()),
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

  return {
    count: resp.rowsAffected,
  }
}
