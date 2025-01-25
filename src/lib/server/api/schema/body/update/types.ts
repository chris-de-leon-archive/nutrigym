import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"
import { enums } from "../../enums"

export const input = builder.inputType("UpdateBodyInput", {
  fields: (t) => ({
    birthday: t.field({ type: scalars.localdate, required: false }),
    gender: t.field({ type: enums.gender, required: false }),
  }),
})
