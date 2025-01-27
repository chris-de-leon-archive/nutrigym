import { GraphQLAuthContext, GraphQLBaseContext } from "./types"
import { auth } from "@clerk/nextjs/server"

export const requireAuth = async <T>(
  ctx: GraphQLBaseContext,
  cb: (ctx: GraphQLAuthContext) => Promise<T>,
) => {
  const { userId } = await auth.protect()
  return await cb({
    ...ctx,
    auth: {
      user: {
        id: userId,
      },
    },
  })
}
