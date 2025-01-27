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

export const ERR_LOG_NOT_FOUND = errors.InternalServerError(
  "failed to find measurement log",
)

export const ERR_BIRTHDAY_IN_FUTURE = errors.BadRequest(
  "birthday cannot be in the future",
)

export const ERR_ENTITY_NOT_FOUND = (entity: string, id: string) =>
  errors.BadRequest(`no entity "${entity}" with ID "${id}" exists`)

export const ERR_CREATE_ENTITY = (entity: string) =>
  errors.InternalServerError(`failed to create entity "${entity}"`)
