import { Gender, ServingUnit } from "@nutrigym/lib/enums"
import { builder } from "@nutrigym/lib/server/api"

const servingUnit = builder.enumType(ServingUnit, { name: "ServingUnit" })
const gender = builder.enumType(Gender, { name: "Gender" })

export const enums = {
  servingUnit,
  gender,
}
