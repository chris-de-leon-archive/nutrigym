import { schema } from "@nutrigym/lib/server/db/schema"
import { MealType } from "@nutrigym/lib/server/enums"
import { foods } from "../../../food"
import { and, eq, inArray } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  allValuesUndefined,
  GraphQLAuthContext,
  stripNull,
  ERR_ENTITY_NOT_FOUND,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    servingsConsumed: z.number().min(0).nullish(),
    mealType: z.nativeEnum(MealType).nullish(),
    food: z
      .object({
        id: z.string().uuid(),
      })
      .nullish(),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const userId = ctx.auth.user.id

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
    const food =
      input.data.food == null
        ? undefined
        : await tx.query.userFood.findFirst({
            where: and(
              eq(schema.userFood.userId, userId),
              eq(schema.userFood.id, input.data.food.id),
            ),
          })

    if (input.data.food != null && food == null) {
      throw ERR_ENTITY_NOT_FOUND(
        foods.types.objects.food.name,
        input.data.food.id,
      )
    }

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
          eq(schema.foodMeasurement.id, input.id),
        ),
      )

    return await tx
      .update(schema.foodMeasurement)
      .set({
        ...input.data,
        servingsConsumed: stripNull(input.data.servingsConsumed),
        mealType: stripNull(input.data.mealType),
        foodId: stripNull(food?.id),
      })
      .where(inArray(schema.foodMeasurement.id, sq))
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
