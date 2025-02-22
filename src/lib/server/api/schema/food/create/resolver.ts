import { ServingUnit } from "@nutrigym/lib/server/enums"
import { schema } from "@nutrigym/lib/server/db/schema"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  data: z.object({
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
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
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
    return await tx
      .insert(schema.userFood)
      .values({
        ...input.data,
        userId: ctx.auth.user.id,
        id: randomUUID(),
      })
      .onConflictDoNothing()
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
