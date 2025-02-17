import { schema, sqlite } from "@nutrigym/lib/server/db/schema"
import { and, eq, getTableColumns, sql } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  date: z.string().date(),
  data: z.object({
    sleepInHours: z.number().min(0).max(24).nullish(),
    waterInMilliliters: z.number().min(0).nullish(),
    shouldersInInches: z.number().min(0).nullish(),
    forearmsInInches: z.number().min(0).nullish(),
    calvesInInches: z.number().min(0).nullish(),
    thighsInInches: z.number().min(0).nullish(),
    waistInInches: z.number().min(0).nullish(),
    chestInInches: z.number().min(0).nullish(),
    armsInInches: z.number().min(0).nullish(),
    neckInInches: z.number().min(0).nullish(),
    hipsInInches: z.number().min(0).nullish(),
    steps: z.number().int().min(0).nullish(),
    heightInInches: z.number().min(0),
    weightInPounds: z.number().min(0),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const measurementLogId = randomUUID()
  const measurementId = randomUUID()
  const userId = ctx.auth.user.id
  const date = input.date

  ctx.providers.invalidator.registerInvalidation({
    request: ctx.yoga.request,
    invalidations: [{ typename: types.objects.bodyMeasurement.name }],
  })

  const sq = ctx.providers.db
    .select({ logId: schema.userMeasurementLog.id })
    .from(schema.userMeasurementLog)
    .where(
      and(
        eq(schema.userMeasurementLog.userId, userId),
        eq(schema.userMeasurementLog.date, date),
      ),
    )
    .as("sq")

  // NOTE: to avoid making multiple round trips to the DB, we use one batch query which does the following:
  //   1. it creates a measurement log record for the given date if one does not already exist
  //   2. it gets the ID of the newly created measurement log or the pre-existing one for the given date
  //   3. it uses the measurement log ID, to insert a body measurement
  //
  // NOTE: the `WHERE 1=1` clause is necessary: https://orm.drizzle.team/docs/insert#insert-into--select
  //
  const columns = getTableColumns(schema.bodyMeasurement)
  const [, result] = await ctx.providers.db.batch([
    ctx.providers.db
      .insert(schema.userMeasurementLog)
      .values({
        id: measurementLogId,
        userId,
        date,
      })
      .onConflictDoNothing(),
    ctx.providers.db
      .insert(schema.bodyMeasurement)
      .select(
        ctx.providers.db
          .select({
            id: sql<string>`${measurementId}`.as(columns.id.name),
            createdAt: sqlite.CurrentMsTimestamp.as(columns.createdAt.name),
            logId: sql`${sq.logId}`.as(columns.logId.name),
            weightInPounds: (input.data.weightInPounds == null
              ? sqlite.NULL
              : sql<number>`${input.data.weightInPounds}`
            ).as(columns.weightInPounds.name),
            heightInInches: (input.data.heightInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.heightInInches}`
            ).as(columns.heightInInches.name),
            waterInMilliliters: (input.data.waterInMilliliters == null
              ? sqlite.NULL
              : sql<number>`${input.data.waterInMilliliters}`
            ).as(columns.waterInMilliliters.name),
            shouldersInInches: (input.data.shouldersInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.shouldersInInches}`
            ).as(columns.shouldersInInches.name),
            forearmsInInches: (input.data.forearmsInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.forearmsInInches}`
            ).as(columns.forearmsInInches.name),
            calvesInInches: (input.data.calvesInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.calvesInInches}`
            ).as(columns.calvesInInches.name),
            thighsInInches: (input.data.thighsInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.thighsInInches}`
            ).as(columns.thighsInInches.name),
            waistInInches: (input.data.waistInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.waistInInches}`
            ).as(columns.waistInInches.name),
            chestInInches: (input.data.chestInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.chestInInches}`
            ).as(columns.chestInInches.name),
            armsInInches: (input.data.armsInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.armsInInches}`
            ).as(columns.armsInInches.name),
            neckInInches: (input.data.neckInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.neckInInches}`
            ).as(columns.neckInInches.name),
            hipsInInches: (input.data.hipsInInches == null
              ? sqlite.NULL
              : sql<number>`${input.data.hipsInInches}`
            ).as(columns.hipsInInches.name),
            sleepInHours: (input.data.sleepInHours == null
              ? sqlite.NULL
              : sql<number>`${input.data.sleepInHours}`
            ).as(columns.sleepInHours.name),
            steps: (input.data.steps == null
              ? sqlite.NULL
              : sql<number>`${input.data.steps}`
            ).as(columns.steps.name),
          })
          .from(sq)
          .where(sql`1=1`),
      )
      .onConflictDoNothing()
      .returning(),
  ])

  return result
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
