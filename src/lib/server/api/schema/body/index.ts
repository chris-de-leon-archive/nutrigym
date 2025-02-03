import { defineModule } from "@nutrigym/lib/server/api"
import { update } from "./update"
import { remove } from "./remove"
import { create } from "./create"
import { types } from "./types"
import { find } from "./find"

export const body = defineModule({
  operations: {
    remove,
    update,
    create,
    find,
  },
  types,
})
