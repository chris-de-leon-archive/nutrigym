import { builder } from "../builder"
import { scalars } from "./scalars"

const uuid = builder.inputType("UuidInput", {
  fields: (t) => ({ id: t.field({ type: scalars.uuid, required: true }) }),
})

export const inputs = {
  uuid,
}
