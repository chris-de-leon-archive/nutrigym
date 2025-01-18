import { AuthContext, GraphQLBaseContext } from "./types"
import * as jwt from "jsonwebtoken"
import {
  ERR_MISSING_AUTH_HEADER,
  ERR_UNEXPECTED_TOKEN,
  ERR_MALFORMED_TOKEN,
  ERR_MISSING_BEARER,
  ERR_MISSING_TOKEN,
  ERR_VERIFY_TOKEN,
} from "./errors"

export const withAuth = async <T>(
  ctx: GraphQLBaseContext,
  cb: (auth: AuthContext) => Promise<T>,
) => {
  // Gets the authorization header values (headers.get(...) is case insensitive)
  const authorization = ctx.yoga.request.headers.get("authorization")
  if (authorization == null) {
    throw ERR_MISSING_AUTH_HEADER
  }

  // Validates the header value
  if (authorization.match(/^bearer\s\S+$/g) == null) {
    throw ERR_MISSING_BEARER
  }

  // Extracts the JWT token
  const token = authorization.trim().split(" ").at(1)
  if (token == null) {
    throw ERR_MISSING_TOKEN
  }

  // NOTE: we are using a networkless request via yoga.fetch / http executor:
  //
  //  https://github.com/dotansimha/graphql-yoga/discussions/2093#discussioncomment-4158259
  //
  // The consequence of this is that we cannot do something like this:
  //
  //   // https://clerk.com/docs/references/backend/sessions/authenticate-request#example
  //   const result = await ctx.clerk.authenticateRequest(ctx.yoga.request, {
  //     secretKey: ctx.env.CLERK_SECRET_KEY,
  //     jwtKey: ctx.env.JWT_KEY,
  //   })
  //   if (!result.isSignedIn || result.token == null) {
  //     throw new GraphQLError(result.message)
  //   }
  //
  // If we do, then we will run into this error:
  //
  //   "Response body object should not be disturbed or locked"
  //
  // Instead, we need to manually verify the JWT using the following code. The code
  // below is networkless since we pass in the JWT key:
  //
  //  https://clerk.com/docs/references/nodejs/token-verification#networkless-token-verification
  //

  // Verifies the JWT: https://clerk.com/docs/backend-requests/handling/manual-jwt#example-usage
  const result = await new Promise<string | jwt.JwtPayload>((res, rej) => {
    jwt.verify(
      token,
      ctx.env.CLERK_JWT_KEY,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err != null) {
          rej(err)
          return
        }
        if (decoded != null) {
          res(decoded)
          return
        }
        rej(new Error("could not verify JWT"))
      },
    )
  }).catch(() => {
    throw ERR_VERIFY_TOKEN
  })

  // The JWT should be an object
  if (typeof result === "string") {
    throw ERR_UNEXPECTED_TOKEN
  }

  // If the `sub` field is missing, throw an error
  const userId = result.sub
  if (userId == null) {
    throw ERR_MALFORMED_TOKEN
  }

  // Add the user ID to the context
  return await cb({
    auth: {
      user: {
        id: userId,
      },
    },
  })
}

export const isValidUpdateObject = <T extends object>(obj: T) => {
  return Object.values(obj).filter((v) => v != null).length === 0
}
