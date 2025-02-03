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
  date: z.string().date(),
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
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.date, input.date),
      ),
    })

    if (log == null) {
      return []
    }

    return await tx
      .delete(schema.foodMeasurement)
      .where(
        and(
          eq(schema.foodMeasurement.logId, log.id),
          inArray(schema.foodMeasurement.id, input.ids),
        ),
      )
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
