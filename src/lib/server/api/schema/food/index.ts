import { defineModule } from "@nutrigym/lib/server/api"
import { create } from "./create"
import { types } from "./types"
import { list } from "./list"

export const foods = defineModule({
  operations: {
    create,
    list,
  },
  types,
})
