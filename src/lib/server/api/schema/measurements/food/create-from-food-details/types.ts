import { builder } from "@nutrigym/lib/server/api"
import { foods } from "../../../food"

export const input = builder.inputType(
  "CreateFoodMeasurementFromFoodDetailsInput",
  {
    fields: (t) => ({
      servingsConsumed: t.float({ required: true }),
      food: t.field({ type: foods.create.types.input, required: true }),
    }),
  },
)
