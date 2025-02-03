import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  date: z.string().date(),
})

const handler = async (
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

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
