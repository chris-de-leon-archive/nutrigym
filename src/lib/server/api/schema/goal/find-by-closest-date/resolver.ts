import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { and, eq, sql } from "drizzle-orm"
import { z } from "zod"

export const zInput = z.object({
  date: z.string().date(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  // NOTE: this will find the row that satisfies both conditions:
  //   1. the row's date does not exceed the input date
  //   2. the row's date is closest to the input date
  //
  const goal = await ctx.providers.db.query.userGoal.findFirst({
    where: and(
      eq(schema.userGoal.userId, ctx.auth.user.id),
      sql`strftime('%s', ${schema.userGoal.date}) <= strftime('%s', ${input.date})`,
    ),
    orderBy: [
      sql`ABS(strftime('%s', ${input.date}) - strftime('%s', ${schema.userGoal.date})) ASC`,
    ],
  })

  if (goal != null) {
    return goal
  }

  // NOTE: if no matches were found, then we'll expand the search to
  // include all rows in the DB (not just ones that have a date that
  // is less than or equal to the input date)
  //
  return await ctx.providers.db.query.userGoal.findFirst({
    where: eq(schema.userGoal.userId, ctx.auth.user.id),
    orderBy: [
      sql`ABS(strftime('%s', ${input.date}) - strftime('%s', ${schema.userGoal.date})) ASC`,
    ],
  })
}
