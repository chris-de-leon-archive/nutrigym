import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { and, eq, inArray } from "drizzle-orm"
import { schema } from "@nutrigym/lib/schema"
import { z } from "zod"

export const zInput = z.object({
  ids: z.string().uuid().array(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db
    .transaction(async (tx) => {
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

      return await tx
        .delete(schema.bodyMeasurement)
        .where(
          and(
            eq(schema.bodyMeasurement.logId, log.id),
            inArray(schema.bodyMeasurement.id, input.ids),
          ),
        )
    })
    .then((r) => ({ count: r.rowsAffected }))
}
