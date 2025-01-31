import { FoodMeasurementKey } from "@nutrigym/lib/server/enums"
import { schema } from "@nutrigym/lib/server/db/schema"
import { foodMeasurementKeyToColumn } from "../utils"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"
import {
  GraphQLAuthContext,
  parseZodDateString,
  asFatalZodError,
  compareDates,
} from "@nutrigym/lib/server/api"

export const zInput = z
  .object({
    key: z.nativeEnum(FoodMeasurementKey),
    date: z.object({
      start: z.string().date(),
      final: z.string().date(),
    }),
    options: z
      .object({
        rollingAverage: z.object({ window: z.number().min(1) }).nullish(),
      })
      .nullish(),
  })
  .superRefine((arg, ctx) => {
    const startDate = parseZodDateString(arg.date.start)
    const finalDate = parseZodDateString(arg.date.final)
    if (compareDates(startDate, finalDate) > 0) {
      return asFatalZodError(
        ctx,
        new Error("start date cannot be greater than final date"),
      )
    }
  })

// TODO: caching - results should be invalidated if
// the log or body measurement tables are modified
export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const window = input.options?.rollingAverage?.window
  const column = foodMeasurementKeyToColumn(input.key)

  // NOTE: there may be some days where the user does not record food
  // measurements. This query will include all these days in the result.
  // If we want to exclude all the days where the user did not record a
  // food measurement, then inner join can be used instead.
  const measurementByDate = ctx.providers.db.$with("sq1").as(
    ctx.providers.db
      .select({
        date: schema.userMeasurementLog.date,
        value:
          sql<number>`SUM(${column} * ${schema.foodMeasurement.servingsConsumed})`.as(
            "value",
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
      .where(eq(schema.userMeasurementLog.userId, ctx.auth.user.id))
      .groupBy(schema.userMeasurementLog.date),
  )

  const rollingAvg = ctx.providers.db.$with("sq2").as(
    ctx.providers.db
      .select({
        date: measurementByDate.date,
        value:
          window != null
            ? sql<number>`AVG(${measurementByDate.value}) OVER (ORDER BY strftime('%s', ${measurementByDate.date}) ROWS BETWEEN ${window - 1} PRECEDING AND CURRENT ROW)`.as(
                "value",
              )
            : measurementByDate.value,
      })
      .from(measurementByDate),
  )

  return await ctx.providers.db
    .with(measurementByDate, rollingAvg)
    .select({ key: rollingAvg.date, value: rollingAvg.value })
    .from(rollingAvg)
    .where(
      sql`strftime('%s', ${rollingAvg.date}) BETWEEN strftime('%s', ${input.date.start}) AND strftime('%s', ${input.date.final})`,
    )
    .orderBy(sql`strftime('%s', ${rollingAvg.date}) DESC`)
}
