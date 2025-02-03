import { foodMeasurementsOverTime } from "./food-measurements-over-time"
import { bodyMeasurementOverTime } from "./body-measurement-over-time"
import { defineModule } from "@nutrigym/lib/server/api"
import { foodStats } from "./food-stats"
import { bodyStats } from "./body-stats"
import { types } from "./types"

import "./init"

export const analytics = defineModule({
  operations: {
    foodMeasurementsOverTime,
    bodyMeasurementOverTime,
    foodStats,
    bodyStats,
  },
  types,
})
