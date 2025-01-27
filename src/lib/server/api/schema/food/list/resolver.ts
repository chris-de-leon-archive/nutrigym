import { GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/server/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const zInput = z.object({})

export const handler = async (
  _: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  return await ctx.providers.db.query.userFood.findMany({
    where: eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
  })
}
