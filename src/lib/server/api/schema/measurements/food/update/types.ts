import { builder } from "@nutrigym/lib/server/api"

export const input = builder.inputType("UpdateFoodMeasurementInput", {
  fields: (t) => ({
    servingsConsumed: t.float({ required: false }),
  }),
})
