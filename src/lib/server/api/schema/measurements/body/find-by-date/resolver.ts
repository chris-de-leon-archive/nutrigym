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
  const [result] = await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .select({ ...getTableColumns(schema.bodyMeasurement) })
      .from(schema.bodyMeasurement)
      .innerJoin(
        schema.userMeasurementLog,
        eq(schema.bodyMeasurement.logId, schema.userMeasurementLog.id),
      )
      .where(
        and(
          eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
          eq(schema.userMeasurementLog.date, input.date),
        ),
      )
      .limit(1)
  })
  return result
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
