import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../../scalars"

export const input = builder.inputType("RemoveMeasurementsInput", {
  fields: (t) => ({
    foodIds: t.field({ type: [scalars.uuid], required: true }),
    bodyIds: t.field({ type: [scalars.uuid], required: true }),
  }),
})
