import { ServingUnit } from "@nutrigym/lib/server/enums"
import { schema } from "@nutrigym/lib/server/db/schema"
import { randomUUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { foods } from "../../../food"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
  ERR_LOG_NOT_FOUND,
  ERR_CREATE_ENTITY,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  date: z.string().date(),
  data: z.object({
    servingsConsumed: z.number().min(0),
    food: z.object({
      name: z.string().min(1),
      brand: z.string().min(1),
      calories: z.number().min(0),
      servingSize: z.number().min(0),
      servingUnit: z.nativeEnum(ServingUnit),
      totalProteinInGrams: z.number().min(0).nullish(),
      totalCarbsInGrams: z.number().min(0).nullish(),
      totalFatInGrams: z.number().min(0).nullish(),
      polyunsaturatedFatInGrams: z.number().min(0).nullish(),
      monounsaturatedFatInGrams: z.number().min(0).nullish(),
      saturatedFatInGrams: z.number().min(0).nullish(),
      potassiumInMilligrams: z.number().min(0).nullish(),
      sodiumInMilligrams: z.number().min(0).nullish(),
      dietaryFiberInGrams: z.number().min(0).nullish(),
      sugarsInGrams: z.number().min(0).nullish(),
      cholesterolInMilligrams: z.number().min(0).nullish(),
      calciumInMilligrams: z.number().min(0).nullish(),
      ironInMilligrams: z.number().min(0).nullish(),
    }),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const measurementLogId = randomUUID()
  const measurementId = randomUUID()
  const foodId = randomUUID()
  const userId = ctx.auth.user.id
  const date = input.date

  // TODO: food creation should be a separate mutation
  ctx.providers.invalidator.registerInvalidation({
    request: ctx.yoga.request,
    invalidations: [
      { typename: types.objects.foodMeasurement.name },
      { typename: foods.types.objects.food.name },
    ],
  })

  return await ctx.providers.db.transaction(async (tx) => {
    // TODO: throw better error message if food name already exists
    // (e.g. if (err instanceof LibsqlError) {...}) or remove unique
    // constraint and allow duplicates. A libsql error looks like this:
    //
    // [Error [LibsqlError]: SQLITE_CONSTRAINT_UNIQUE: UNIQUE constraint failed: user_food.user_id, user_food.name, user_food.brand] {
    //   code: 'SQLITE_CONSTRAINT_UNIQUE',
    //   rawCode: 2067,
    //   [cause]: [SqliteError: UNIQUE constraint failed: user_food.user_id, user_food.name, user_food.brand] {
    //     code: 'SQLITE_CONSTRAINT_UNIQUE',
    //     rawCode: 2067
    //   }
    // }
    //
    // Docs on errors here: https://www.sqlite.org/rescode.html
    //
    const food = await tx
      .insert(schema.userFood)
      .values({
        ...input.data.food,
        id: foodId,
        userId,
      })
      .onConflictDoNothing()
    if (food.rowsAffected === 0) {
      throw ERR_CREATE_ENTITY(foods.types.objects.food.name)
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
        id: measurementId,
        logId: log.id,
        foodId,
      })
      .onConflictDoNothing()
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
