import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"
import { enums } from "../../enums"

export const input = builder.inputType("CreateBodyInput", {
  fields: (t) => ({
    birthday: t.field({ type: scalars.localdate, required: true }),
    gender: t.field({ type: enums.gender, required: true }),
  }),
})
