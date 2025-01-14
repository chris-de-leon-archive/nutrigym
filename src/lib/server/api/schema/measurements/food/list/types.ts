import { builder } from "@nutrigym/lib/server/api"
import { inputs } from "../../../inputs"

export const input = builder.inputType("CreateFoodMeasurementFromFoodIdInput", {
  fields: (t) => ({
    servingsConsumed: t.float({ required: true }),
    food: t.field({ type: inputs.uuid, required: true }),
  }),
})
