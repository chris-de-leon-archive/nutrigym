import { schema } from "@nutrigym/lib/server/db/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { foods } from "../../../food"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  ERR_ENTITY_NOT_FOUND,
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  date: z.string().date(),
  data: z.object({
    servingsConsumed: z.number().min(0),
    food: z.object({
      id: z.string().uuid(),
    }),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const measurementLogId = randomUUID()
  const measurementId = randomUUID()
  const userId = ctx.auth.user.id
  const date = input.date

  ctx.providers.invalidator.registerInvalidation({
    request: ctx.yoga.request,
    invalidations: [{ typename: types.objects.foodMeasurement.name }],
  })

  return await ctx.providers.db.transaction(async (tx) => {
    const food = await tx.query.userFood.findFirst({
      where: and(
        eq(schema.userFood.userId, userId),
        eq(schema.userFood.id, input.data.food.id),
      ),
    })
    if (food == null) {
      throw ERR_ENTITY_NOT_FOUND(
        foods.types.objects.food.name,
        input.data.food.id,
      )
    }

    await tx
      .insert(schema.userMeasurementLog)
      .values({
        id: measurementLogId,
        userId,
        date,
      })
      .onConflictDoNothing()

    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, userId),
        eq(schema.userMeasurementLog.date, date),
      ),
    })
    if (log == null) {
      throw ERR_LOG_NOT_FOUND
    }

    return await tx
      .insert(schema.foodMeasurement)
      .values({
        servingsConsumed: input.data.servingsConsumed,
        foodId: input.data.food.id,
        id: measurementId,
        logId: log.id,
      })
      .onConflictDoNothing()
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
