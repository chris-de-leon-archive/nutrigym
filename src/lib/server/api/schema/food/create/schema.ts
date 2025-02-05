import { resolver } from "./resolver"
import { enums } from "../../enums"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "createFood"

const input = builder.inputType("CreateFoodInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    brand: t.string({ required: true }),
    calories: t.float({ required: true }),
    servingSize: t.float({ required: true }),
    servingUnit: t.field({ type: enums.servingUnit, required: true }),
    totalProteinInGrams: t.float({ required: false }),
    totalCarbsInGrams: t.float({ required: false }),
    totalFatInGrams: t.float({ required: false }),
    polyunsaturatedFatInGrams: t.float({ required: false }),
    monounsaturatedFatInGrams: t.float({ required: false }),
    saturatedFatInGrams: t.float({ required: false }),
    potassiumInMilligrams: t.float({ required: false }),
    sodiumInMilligrams: t.float({ required: false }),
    dietaryFiberInGrams: t.float({ required: false }),
    sugarsInGrams: t.float({ required: false }),
    cholesterolInMilligrams: t.float({ required: false }),
    calciumInMilligrams: t.float({ required: false }),
    ironInMilligrams: t.float({ required: false }),
  }),
})

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.food],
    args: {
      data: t.arg({ type: input, required: true }),
    },
    validate: {
      schema: resolver.input,
    },
    resolve: async (_, args, ctx) => {
      return await requireAuth(ctx, async (auth) => {
        return await resolver.handler(args, auth)
      })
    },
  }),
)

export const schema = defineOperationSchema({
  name,
  input,
})
