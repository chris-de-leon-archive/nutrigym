import { defineOperation } from "@nutrigym/lib/server/api"
import { schema } from "./schema"

export const create = defineOperation({
  resolver: undefined,
  schema,
})
