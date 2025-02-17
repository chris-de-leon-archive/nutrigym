import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq, inArray } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  ids: z.string().uuid().array(),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (input.ids.length === 0) {
    return []
  } else {
    ctx.providers.invalidator.registerInvalidation({
      request: ctx.yoga.request,
      invalidations: input.ids.map((id) => ({
        typename: types.objects.foodMeasurement.name,
        id,
      })),
    })
  }

  return await ctx.providers.db.transaction(async (tx) => {
    const sq = tx
      .select({ id: schema.foodMeasurement.id })
      .from(schema.foodMeasurement)
      .innerJoin(
        schema.userMeasurementLog,
        eq(schema.foodMeasurement.logId, schema.userMeasurementLog.id),
      )
      .where(
        and(
          eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
          inArray(schema.foodMeasurement.id, input.ids),
        ),
      )

    return await tx
      .delete(schema.foodMeasurement)
      .where(inArray(schema.foodMeasurement.id, sq))
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
