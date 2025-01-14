import { builder } from "@nutrigym/lib/server/api"
import { Gender } from "@nutrigym/lib/enums"

const gender = builder.enumType(Gender, { name: "Gender" })

export const enums = {
  gender,
}
