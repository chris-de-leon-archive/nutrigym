import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

export const zInput = z.object({
  date: z.string().date(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.date, input.date),
      ),
    })

    if (log == null) {
      return []
    }

    return await ctx.providers.db.query.foodMeasurement.findMany({
      where: eq(schema.foodMeasurement.logId, log.id),
    })
  })
}
