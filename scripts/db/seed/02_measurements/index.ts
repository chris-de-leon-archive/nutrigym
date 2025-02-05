import { schema } from "@nutrigym/lib/server/db/schema"
import { MealType } from "@nutrigym/lib/server/enums"
import { generateDatesToPresent } from "../../utils"
import { pick } from "@nutrigym/lib/objects"
import { seed } from "drizzle-seed"
import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { env } from "../../env"
import { db } from "../../db"

type Args = {
  date: Date
}

export default async function main(args: Args) {
  const userId = env.CLERK_USER_ID
  const tables = pick(schema, [
    "userMeasurementLog",
    "bodyMeasurement",
    "foodMeasurement",
  ])

  const foods = await db
    .select({ id: schema.userFood.id })
    .from(schema.userFood)
    .where(eq(schema.userFood.userId, userId))

  const allDates = generateDatesToPresent(args.date)
  const foodIds = foods.map(({ id }) => id)
  const logIds = allDates.map(() => randomUUID())

  await seed(db, tables).refine((f) => {
    return {
      userMeasurementLog: {
        count: allDates.length,
        columns: {
          id: f.valuesFromArray({
            values: logIds,
            isUnique: true,
          }),
          createdAt: f.datetime(),
          userId: f.default({ defaultValue: userId }),
          date: f.valuesFromArray({
            values: allDates,
            isUnique: true,
          }),
        },
      },
      bodyMeasurement: {
        count: allDates.length,
        columns: {
          id: f.uuid(),
          createdAt: f.datetime(),
          logId: f.valuesFromArray({
            values: logIds,
            isUnique: true,
          }),
          weightInPounds: f.number({
            minValue: 100,
            maxValue: 300,
            precision: 1,
          }),
          heightInInches: f.number({
            minValue: 60,
            maxValue: 80,
            precision: 1,
          }),
          waterInMilliliters: f.number({
            minValue: 0,
            maxValue: 5000,
            precision: 2,
          }),
          shouldersInInches: f.number({
            minValue: 15,
            maxValue: 25,
            precision: 1,
          }),
          forearmsInInches: f.number({
            minValue: 7,
            maxValue: 15,
            precision: 1,
          }),
          calvesInInches: f.number({
            minValue: 10,
            maxValue: 20,
            precision: 1,
          }),
          thighsInInches: f.number({
            minValue: 15,
            maxValue: 30,
            precision: 1,
          }),
          waistInInches: f.number({
            minValue: 20,
            maxValue: 50,
            precision: 1,
          }),
          chestInInches: f.number({
            minValue: 30,
            maxValue: 50,
            precision: 1,
          }),
          armsInInches: f.number({
            minValue: 10,
            maxValue: 20,
            precision: 1,
          }),
          neckInInches: f.number({
            minValue: 10,
            maxValue: 20,
            precision: 1,
          }),
          hipsInInches: f.number({
            minValue: 30,
            maxValue: 50,
            precision: 1,
          }),
          sleepInHours: f.number({
            minValue: 0,
            maxValue: 24,
            precision: 1,
          }),
          steps: f.int({
            minValue: 0,
            maxValue: 30000,
          }),
        },
      },
      foodMeasurement: {
        // e.g. 3 meals a day, 5 foods per meal
        count: allDates.length * 3 * 5,
        columns: {
          id: f.uuid(),
          createdAt: f.datetime(),
          logId: f.valuesFromArray({
            values: logIds,
            isUnique: false,
          }),
          foodId: f.valuesFromArray({
            values: foodIds,
            isUnique: false,
          }),
          servingsConsumed: f.number({
            minValue: 0,
            maxValue: 2,
            precision: 2,
          }),
          mealType: f.valuesFromArray({ values: Object.values(MealType) }),
        },
      },
    }
  })
}
