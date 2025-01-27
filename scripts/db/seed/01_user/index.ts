import { Gender, ServingUnit } from "@nutrigym/lib/server/enums"
import { schema } from "@nutrigym/lib/server/db/schema"
import { pick } from "@nutrigym/lib/objects"
import { seed } from "drizzle-seed"
import { env } from "../../env"
import { db } from "../../db"

type Args = {
  foodCount: number
}

export default async function main(args: Args) {
  const tables = pick(schema, ["user", "userBody", "userGoal", "userFood"])
  const userId = env.CLERK_USER_ID

  await seed(db, tables).refine((f) => {
    return {
      user: {
        count: 1,
        columns: {
          id: f.default({ defaultValue: userId }),
          createdAt: f.datetime(),
        },
      },
      userBody: {
        count: 1,
        columns: {
          id: f.uuid(),
          createdAt: f.datetime(),
          userId: f.default({ defaultValue: userId }),
          gender: f.valuesFromArray({ values: Object.values(Gender) }),
          birthday: f.date(),
        },
      },
      userGoal: {
        count: 1,
        columns: {
          id: f.uuid(),
          createdAt: f.datetime(),
          userId: f.default({ defaultValue: userId }),
          waterInMilliliters: f.number({
            minValue: 0,
            maxValue: 5000,
            precision: 2,
          }),
          weightInPounds: f.number({
            minValue: 120,
            maxValue: 300,
            precision: 2,
          }),
          sleepInHours: f.number({ minValue: 0, maxValue: 24, precision: 1 }),
          calories: f.number({ minValue: 0, maxValue: 10000, precision: 1 }),
          proteinPercentage: f.default({ defaultValue: 25 }),
          carbsPercentage: f.default({ defaultValue: 50 }),
          fatPercentage: f.default({ defaultValue: 25 }),
          steps: f.int({ minValue: 0 }),
          date: f.date(),
        },
      },
      userFood: {
        count: args.foodCount,
        columns: {
          id: f.uuid(),
          createdAt: f.datetime(),
          userId: f.default({ defaultValue: userId }),
          name: f.string(),
          brand: f.string(),
          calories: f.number({ minValue: 0, maxValue: 500, precision: 1 }),
          servingSize: f.number({ minValue: 0, maxValue: 10000, precision: 2 }),
          servingUnit: f.valuesFromArray({
            values: Object.values(ServingUnit),
          }),
          totalProteinInGrams: f.number({
            minValue: 0,
            maxValue: 25,
            precision: 2,
          }),
          totalCarbsInGrams: f.number({
            minValue: 0,
            maxValue: 25,
            precision: 2,
          }),
          totalFatInGrams: f.number({
            minValue: 0,
            maxValue: 25,
            precision: 2,
          }),
          polyunsaturatedFatInGrams: f.number({
            minValue: 0,
            maxValue: 5,
            precision: 2,
          }),
          monounsaturatedFatInGrams: f.number({
            minValue: 0,
            maxValue: 5,
            precision: 2,
          }),
          saturatedFatInGrams: f.number({
            minValue: 0,
            maxValue: 5,
            precision: 2,
          }),
          potassiumInMilligrams: f.number({
            minValue: 0,
            maxValue: 400,
            precision: 1,
          }),
          sodiumInMilligrams: f.number({
            minValue: 0,
            maxValue: 200,
            precision: 1,
          }),
          dietaryFiberInGrams: f.number({
            minValue: 0,
            maxValue: 10,
            precision: 1,
          }),
          sugarsInGrams: f.number({ minValue: 0, maxValue: 20, precision: 1 }),
          cholesterolInMilligrams: f.number({
            minValue: 0,
            maxValue: 10,
            precision: 1,
          }),
          calciumInMilligrams: f.number({
            minValue: 0,
            maxValue: 500,
            precision: 1,
          }),
          ironInMilligrams: f.number({
            minValue: 0,
            maxValue: 10,
            precision: 1,
          }),
        },
      },
    }
  })
}
