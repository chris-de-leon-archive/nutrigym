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
  "failed to create body",
)

export const ERR_LOG_NOT_FOUND = errors.InternalServerError(
  "failed to find measurement log",
)

export const ERR_NO_GOALS_SET = errors.BadRequest(
  "goals must be set before measurements can be taken",
)

export const ERR_FOOD_NOT_FOUND = (id: string) =>
  errors.BadRequest(`no food with ID "${id}" exists`)
