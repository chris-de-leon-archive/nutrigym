import { randomUUID } from "node:crypto"
import { Plugin } from "graphql-yoga"

export const REQUEST_ID_HEADER = "X-NutriGym-Request-ID"

export function withRequestID(): Plugin {
  return {
    onRequest(payload) {
      payload.request.headers.set(REQUEST_ID_HEADER, randomUUID())
    },
  }
}
