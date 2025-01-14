import { AuthContext, GraphQLBaseContext } from "./types"
import { errors } from "./errors"

export const withAuth = async <T>(
  ctx: GraphQLBaseContext,
  cb: (auth: AuthContext) => Promise<T>,
) => {
  const state = await ctx.providers.clerk.authenticateRequest(
    ctx.yoga.request,
    { jwtKey: ctx.env.CLERK_JWT_KEY },
  )

  if (!state.isSignedIn) {
    throw errors.Unauthorized("user must sign in")
  }

  const auth = state.toAuth()
  return await cb({
    auth: {
      user: {
        id: auth.userId,
      },
    },
  })
}

export const isValidUpdateObject = <T extends object>(obj: T) => {
  return Object.values(obj).filter((v) => v != null).length === 0
}

export const stripNull = <T>(val: T | undefined | null) => {
  return val == null ? undefined : val
}
