import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { and, eq, inArray } from "drizzle-orm"
import { schema } from "@nutrigym/lib/schema"
import { z } from "zod"

export const zInput = z.object({
  ids: z.string().uuid().array().nullish(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
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
      return { rowsAffected: 0 }
    }

    if (input.ids == null) {
      return await tx
        .delete(schema.foodMeasurement)
        .where(eq(schema.foodMeasurement.logId, log.id))
    } else {
      return await tx
        .delete(schema.foodMeasurement)
        .where(
          and(
            eq(schema.foodMeasurement.logId, log.id),
            inArray(schema.foodMeasurement.id, input.ids),
          ),
        )
    }
  })

  return {
    count: resp.rowsAffected,
  }
}
