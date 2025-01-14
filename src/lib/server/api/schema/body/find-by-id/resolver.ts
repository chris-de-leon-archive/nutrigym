import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

export const zInput = z.object({
  id: z.string().uuid(),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db.query.userBody.findFirst({
    where: and(
      eq(schema.userBody.userId, ctx.auth.user.id),
      eq(schema.userBody.id, input.id),
    ),
  })
}
