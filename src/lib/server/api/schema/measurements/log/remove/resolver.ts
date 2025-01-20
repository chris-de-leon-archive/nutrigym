import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { and, eq, inArray } from "drizzle-orm"
import { schema } from "@nutrigym/lib/schema"
import { z } from "zod"

export const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    foodIds: z.string().uuid().array(),
    bodyIds: z.string().uuid().array(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.id, input.id),
      ),
    })
    if (log == null) {
      return null
    }

    const { foodIds } = input.data
    if (foodIds.length > 0) {
      await tx
        .delete(schema.foodMeasurement)
        .where(
          and(
            eq(schema.foodMeasurement.logId, log.id),
            inArray(schema.foodMeasurement.id, foodIds),
          ),
        )
    }

    const { bodyIds } = input.data
    if (bodyIds.length > 0) {
      await tx
        .delete(schema.bodyMeasurement)
        .where(
          and(
            eq(schema.bodyMeasurement.logId, log.id),
            inArray(schema.bodyMeasurement.id, bodyIds),
          ),
        )
    }

    return null
  })
}
