import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq, getTableColumns } from "drizzle-orm"
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
    return await tx
      .select({ ...getTableColumns(schema.foodMeasurement) })
      .from(schema.foodMeasurement)
      .innerJoin(
        schema.userMeasurementLog,
        eq(schema.foodMeasurement.logId, schema.userMeasurementLog.id),
      )
      .where(
        and(
          eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
          eq(schema.userMeasurementLog.date, input.date),
        ),
      )
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
