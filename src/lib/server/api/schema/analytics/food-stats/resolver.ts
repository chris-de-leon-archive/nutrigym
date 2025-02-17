import { schema } from "@nutrigym/lib/server/db/schema"
import { and, avg, count, eq, sql } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
  parseZodDateString,
  asFatalZodError,
  hashGqlParams,
  compareDates,
  countDays,
} from "@nutrigym/lib/server/api"

const zInput = z
  .object({
    date: z.object({
      start: z.string().date(),
      final: z.string().date(),
    }),
  })
  .superRefine((arg, ctx) => {
    const start = parseZodDateString(arg.date.start)
    const final = parseZodDateString(arg.date.final)
    if (compareDates(start, final) > 0) {
      return asFatalZodError(
        ctx,
        new Error("start date cannot be greater than final date"),
      )
    }
  })

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const opStatsID = hashGqlParams(ctx.yoga.params)
  const startDate = parseZodDateString(input.date.start)
  const finalDate = parseZodDateString(input.date.final)
  const totalDays = countDays(startDate, finalDate)
  if (totalDays === 0) {
    return {
      id: opStatsID,
      data: [],
    }
  }

  const totalsByDay = ctx.providers.db.$with("sq").as(
    ctx.providers.db
      .select({
        date: schema.userMeasurementLog.date,
        calories:
          sql<number>`SUM(${schema.userFood.calories} * ${schema.foodMeasurement.servingsConsumed})`.as(
            "calories",
          ),
        protein:
          sql<number>`SUM(${schema.userFood.totalProteinInGrams} * ${schema.foodMeasurement.servingsConsumed})`.as(
            "protein",
          ),
        carbs:
          sql<number>`SUM(${schema.userFood.totalCarbsInGrams} * ${schema.foodMeasurement.servingsConsumed})`.as(
            "carbs",
          ),
        fats: sql<number>`SUM(${schema.userFood.totalFatInGrams} * ${schema.foodMeasurement.servingsConsumed})`.as(
          "fats",
        ),
      })
      .from(schema.userMeasurementLog)
      .leftJoin(
        schema.foodMeasurement,
        eq(schema.userMeasurementLog.id, schema.foodMeasurement.logId),
      )
      .leftJoin(
        schema.userFood,
        eq(schema.foodMeasurement.foodId, schema.userFood.id),
      )
      .where(
        and(
          eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
          sql`strftime('%s', ${schema.userMeasurementLog.date}) BETWEEN strftime('%s', ${input.date.start}) AND strftime('%s', ${input.date.final})`,
        ),
      )
      .groupBy(schema.userMeasurementLog.date),
  )

  const [result] = await ctx.providers.db
    .with(totalsByDay)
    .select({
      // NOTE: if the user did not log their measurements on a particular
      // day, then all fields for that day will be null. In this case, we
      // arbitrarily chose the calories column to count the total number of
      // non-null measurements. Keep in mind that it is not correct to use
      // COUNT(*) since it will include all days even those where the user
      // did not record a measurement.
      measurementCount:  count(totalsByDay.calories),
      avgCalories:       avg(totalsByDay.calories),
      avgProtein:        avg(totalsByDay.protein),
      avgCarbs:          avg(totalsByDay.carbs),
      avgFats:           avg(totalsByDay.fats),
    })
    .from(totalsByDay)
    .limit(1)

  return {
    id: opStatsID,
    data: [
      {
        key: "Total Number of Measurements",
        value: result.measurementCount,
      },
      {
        key: "Consistency %",
        value: (result.measurementCount / totalDays) * 100,
      },
      {
        key: "Avg. Calories Eaten Per Day",
        value: result.avgCalories,
      },
      {
        key: "Avg. Protein (g) Eaten Per Day",
        value: result.avgProtein,
      },
      {
        key: "Avg. Carbs (g) Eaten Per Day",
        value: result.avgCarbs,
      },
      {
        key: "Avg. Fat (g) Eaten Per Day",
        value: result.avgFats,
      },
    ],
  }
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
