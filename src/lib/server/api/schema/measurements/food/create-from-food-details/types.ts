import { builder } from "@nutrigym/lib/server/api"
import { food } from "../../../food"

export const input = builder.inputType(
  "CreateFoodMeasurementFromFoodDetailsInput",
  {
    fields: (t) => ({
      servingsConsumed: t.float({ required: true }),
      food: t.field({ type: food.create.types.input, required: true }),
    }),
  },
)
