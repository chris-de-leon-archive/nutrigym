import { findByClosestDate } from "./find-by-closest-date"
import { defineModule } from "@nutrigym/lib/server/api"
import { remove } from "./remove"
import { update } from "./update"
import { create } from "./create"
import { types } from "./types"

export const goal = defineModule({
  operations: {
    findByClosestDate,
    create,
    remove,
    update,
  },
  types,
})
