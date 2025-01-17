import { GraphQLErrorCode } from "@nutrigym/lib/enums"
import { GraphQLError } from "graphql"

const makeError = (
  opts: Readonly<{
    code: GraphQLErrorCode
    status: number
  }>,
) => {
  return (msg: string) =>
    new GraphQLError(msg, {
      extensions: {
        code: opts.code,
        http: {
          status: opts.status,
        },
      },
    })
}

export const errors = {
  BadRequest: makeError({
    code: GraphQLErrorCode.BAD_REQUEST,
    status: 400,
  }),
  Unauthorized: makeError({
    code: GraphQLErrorCode.UNAUTHORIZED,
    status: 401,
  }),
  InternalServerError: makeError({
    code: GraphQLErrorCode.INTERNAL_SERVER_ERROR,
    status: 500,
  }),
}

export const ERR_VERIFY_TOKEN = errors.Unauthorized("failed to verify token")

export const ERR_UNAUTHORIZED = errors.Unauthorized("user must sign in")

export const ERR_MISSING_AUTH_HEADER = errors.Unauthorized(
  "request is missing authorization header",
)

export const ERR_MISSING_BEARER = errors.Unauthorized(
  "authorization header is malformed",
)

export const ERR_MISSING_TOKEN = errors.Unauthorized(
  "authorization header has no token",
)

export const ERR_UNEXPECTED_TOKEN = errors.Unauthorized(
  "received unexpected string from JWT verification",
)

export const ERR_MALFORMED_TOKEN = errors.Unauthorized(
  'JWT is missing "sub" field',
)

export const ERR_CREATE_FOOD_MEASUREMENT = errors.InternalServerError(
  "failed to record food measurement",
)

export const ERR_CREATE_BODY_MEASUREMENT = errors.InternalServerError(
  "failed to record body measurement",
)

export const ERR_CREATE_FOOD = errors.InternalServerError(
  "failed to create food",
)

export const ERR_CREATE_BODY = errors.InternalServerError(
  "failed to create body",
)

export const ERR_CREATE_GOAL = errors.InternalServerError(
  "failed to create goal",
)

export const ERR_LOG_NOT_FOUND = errors.InternalServerError(
  "failed to find measurement log",
)

export const ERR_NO_GOALS_SET = errors.BadRequest(
  "goals must be set before measurements can be taken",
)

export const ERR_FOOD_NOT_FOUND = (id: string) =>
  errors.BadRequest(`no food with ID "${id}" exists`)
