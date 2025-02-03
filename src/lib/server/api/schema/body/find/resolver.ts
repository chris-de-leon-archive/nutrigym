import { schema } from "@nutrigym/lib/server/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({})

const handler = async (_: z.infer<typeof zInput>, ctx: GraphQLAuthContext) => {
  return await ctx.providers.db.query.userBody.findFirst({
    where: eq(schema.userBody.userId, ctx.auth.user.id),
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
