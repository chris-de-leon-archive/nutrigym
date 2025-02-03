import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  allValuesUndefined,
  GraphQLAuthContext,
  stripNull,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  id: z.string().uuid(),
  date: z.string().date(),
  data: z.object({
    servingsConsumed: z.number().min(0).nullish(),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (allValuesUndefined(input.data)) {
    return []
  } else {
    ctx.providers.invalidator.registerInvalidation({
      request: ctx.yoga.request,
      invalidations: [
        { typename: types.objects.foodMeasurement.name, id: input.id },
      ],
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
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
