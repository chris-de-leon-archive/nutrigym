import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq, inArray } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  ids: z.string().uuid().array(),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (input.ids.length === 0) {
    return []
  }

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .delete(schema.userGoal)
      .where(
        and(
          eq(schema.userGoal.userId, ctx.auth.user.id),
          inArray(schema.userGoal.id, input.ids),
        ),
      )
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
