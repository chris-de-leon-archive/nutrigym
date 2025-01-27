import { builder } from "@nutrigym/lib/server/api"
import {
  BodyMeasurementKey,
  FoodMeasurementKey,
  ServingUnit,
  Gender,
} from "@nutrigym/lib/server/enums"

const foodMeasurementKey = builder.enumType(FoodMeasurementKey, {
  name: "FoodMeasurementKey",
})

const bodyMeasurementKey = builder.enumType(BodyMeasurementKey, {
  name: "BodyMeasurementKey",
})

const servingUnit = builder.enumType(ServingUnit, {
  name: "ServingUnit",
})

const gender = builder.enumType(Gender, {
  name: "Gender",
})

export const enums = {
  foodMeasurementKey,
  bodyMeasurementKey,
  servingUnit,
  gender,
}
