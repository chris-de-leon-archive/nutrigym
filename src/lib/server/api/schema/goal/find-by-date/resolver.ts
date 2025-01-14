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
  return await ctx.providers.db.query.userGoal.findFirst({
    where: eq(schema.userGoal.userId, ctx.auth.user.id),
    orderBy: sql`${schema.userGoal.createdAt} - ${input.date.getTime()} ASC`,
  })
}
