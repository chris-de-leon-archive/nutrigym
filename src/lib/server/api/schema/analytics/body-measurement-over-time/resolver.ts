import { BodyMeasurementKey } from "@nutrigym/lib/server/enums"
import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { z } from "zod"
import {
  GraphQLAuthContext,
  parseZodDateString,
  asFatalZodError,
  compareDates,
  errors,
} from "@nutrigym/lib/server/api"

export const zInput = z
  .object({
    key: z.nativeEnum(BodyMeasurementKey),
    date: z.object({
      start: z.string().date(),
      final: z.string().date(),
    }),
    options: z
      .object({
        rollingAverage: z.object({ window: z.number().min(0) }).nullish(),
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

  const column = (() => {
    switch (input.key) {
      case BodyMeasurementKey.WeightInLbs:
        return schema.bodyMeasurement.weightInPounds
      case BodyMeasurementKey.SleepInHrs:
        return schema.bodyMeasurement.sleepInHours
      case BodyMeasurementKey.WaterInMl:
        return schema.bodyMeasurement.waterInMilliliters
      case BodyMeasurementKey.Steps:
        return schema.bodyMeasurement.steps
      default:
        throw errors.BadRequest(`invalid key: ${input.key}`)
    }
  })()

  // NOTE: there may be some days where the user does not record a body
  // measurement. This query will include all these days in the result.
  // If we want to exclude all the days where the user did not record a
  // body measurement, then inner join can be used instead.
  return await ctx.providers.db
    .select({
      date: schema.userMeasurementLog.date,
      value:
        window != null
          ? sql<number>`AVG(${column}) OVER (ORDER BY strftime('%s', ${schema.userMeasurementLog.date}) ROWS BETWEEN ${window - 1} PRECEDING AND CURRENT ROW)`
          : column,
    })
    .from(schema.userMeasurementLog)
    .leftJoin(
      schema.bodyMeasurement,
      eq(schema.userMeasurementLog.id, schema.bodyMeasurement.logId),
    )
    .where(
      and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        sql`strftime('%s', ${schema.userMeasurementLog.date}) BETWEEN strftime('%s', ${input.date.start}) AND strftime('%s', ${input.date.final})`,
      ),
    )
    .orderBy(sql`strftime('%s', ${schema.userMeasurementLog.date}) DESC`)
}
