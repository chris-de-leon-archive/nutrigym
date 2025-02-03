import { createFromFoodDetails } from "./create-from-food-details"
import { createFromFoodID } from "./create-from-food-id"
import { defineModule } from "@nutrigym/lib/server/api"
import { findByDate } from "./find-by-date"
import { update } from "./update"
import { remove } from "./remove"
import { types } from "./types"

export const foodMeasurements = defineModule({
  operations: {
    createFromFoodDetails,
    createFromFoodID,
    findByDate,
    update,
    remove,
  },
  types,
})
