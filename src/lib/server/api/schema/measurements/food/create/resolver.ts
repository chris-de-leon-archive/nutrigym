import { schema, sqlite } from "@nutrigym/lib/server/db/schema"
import { and, eq, getTableColumns, sql } from "drizzle-orm"
import { MealType } from "@nutrigym/lib/server/enums"
import { randomUUID } from "node:crypto"
import { foods } from "../../../food"
import { z } from "zod"
import {
  defineOperationResolver,
  ERR_ENTITY_NOT_FOUND,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  date: z.string().date(),
  data: z.object({
    servingsConsumed: z.number().min(0),
    mealType: z.nativeEnum(MealType),
    food: z.object({
      id: z.string().uuid(),
    }),
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

  const food = await ctx.providers.db.query.userFood.findFirst({
    where: and(
      eq(schema.userFood.userId, userId),
      eq(schema.userFood.id, input.data.food.id),
    ),
  })

  if (food == null) {
    throw ERR_ENTITY_NOT_FOUND(
      foods.types.objects.food.name,
      input.data.food.id,
    )
  }

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
  //   3. it uses the measurement log ID, to insert a food measurement
  //
  // NOTE: the `WHERE 1=1` clause is necessary: https://orm.drizzle.team/docs/insert#insert-into--select
  //
  const columns = getTableColumns(schema.foodMeasurement)
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
      .insert(schema.foodMeasurement)
      .select(
        ctx.providers.db
          .select({
            id: sql<string>`${measurementId}`.as(columns.id.name),
            createdAt: sqlite.CurrentMsTimestamp.as(columns.createdAt.name),
            logId: sql`${sq.logId}`.as(columns.logId.name),
            foodId: sql<string>`${input.data.food.id}`.as(columns.foodId.name),
            servingsConsumed: sql<number>`${input.data.servingsConsumed}`.as(
              columns.servingsConsumed.name,
            ),
            mealType: sql<string>`${input.data.mealType}`.as(
              columns.mealType.name,
            ),
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
