import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"

export const zInput = z.object({
  date: z.date(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const formattedDate = [
    input.date.getUTCFullYear().toString(),
    (input.date.getUTCMonth() + 1).toString().padStart(2, "0"),
    input.date.getUTCDate().toString().padStart(2, "0"),
  ].join("-")

  return await ctx.providers.db.query.userGoal.findFirst({
    where: eq(schema.userGoal.userId, ctx.auth.user.id),
    orderBy: [
      sql`ABS(strftime('%s', ${formattedDate}) - strftime('%s', ${schema.userGoal.year} || '-' || printf('%02d', (${schema.userGoal.month} + 1)) || '-' || printf('%02d', ${schema.userGoal.day}))) ASC`,
    ],
  })
}
