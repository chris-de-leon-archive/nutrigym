import { defineOperation } from "@nutrigym/lib/server/api"
import { resolver } from "./resolver"
import { schema } from "./schema"

export const create = defineOperation({
  resolver,
  schema,
})
