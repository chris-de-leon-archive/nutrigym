import { builder } from "../builder"
import { scalars } from "./scalars"

const uuid = builder.inputType("UuidInput", {
  fields: (t) => ({ id: t.field({ type: scalars.uuid, required: true }) }),
})

const date = builder.inputType("DateInput", {
  fields: (t) => ({ date: t.field({ type: scalars.date, required: true }) }),
})

export const inputs = {
  uuid,
  date,
}
