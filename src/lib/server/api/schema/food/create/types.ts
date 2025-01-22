import { builder } from "@nutrigym/lib/server/api"
import { enums } from "../../enums"

export const input = builder.inputType("CreateFoodInput", {
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
