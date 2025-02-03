import { defineModule } from "@nutrigym/lib/server/api"
import { findByDate } from "./find-by-date"
import { create } from "./create"
import { update } from "./update"
import { remove } from "./remove"
import { types } from "./types"

export const bodyMeasurements = defineModule({
  operations: {
    findByDate,
    create,
    update,
    remove,
  },
  types,
})
