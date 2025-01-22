import { GraphQLAuthContext, GraphQLBaseContext } from "./types"
import { auth } from "@clerk/nextjs/server"
import { ERR_UNAUTHORIZED } from "./errors"

export const requireAuth = async <T>(
  ctx: GraphQLBaseContext,
  cb: (ctx: GraphQLAuthContext) => Promise<T>,
) => {
  const { userId } = await auth()
  if (userId == null) {
    throw ERR_UNAUTHORIZED
  } else {
    return await cb({
      ...ctx,
      auth: {
        user: {
          id: userId,
        },
      },
    })
  }
}
