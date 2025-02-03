import { schema } from "@nutrigym/lib/server/db/schema"
import { eq } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

const zInput = z.object({})

const handler = async (_: z.infer<typeof zInput>, ctx: GraphQLAuthContext) => {
  ctx.providers.invalidator.registerInvalidation({
    request: ctx.yoga.request,
    invalidations: [{ typename: types.objects.body.name }],
  })

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .delete(schema.userBody)
      .where(eq(schema.userBody.userId, ctx.auth.user.id))
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
