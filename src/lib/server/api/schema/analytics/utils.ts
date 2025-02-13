import { FoodMeasurementKey } from "@nutrigym/lib/server/enums"
import { BodyMeasurementKey } from "@nutrigym/lib/server/enums"
import { AssertUnreachable } from "@nutrigym/lib/assert"
import { schema } from "@nutrigym/lib/server/db/schema"

export const bodyMeasurementKeyToColumn = (key: BodyMeasurementKey) => {
  switch (key) {
    case BodyMeasurementKey.WeightInLbs:
      return schema.bodyMeasurement.weightInPounds
    case BodyMeasurementKey.SleepInHrs:
      return schema.bodyMeasurement.sleepInHours
    case BodyMeasurementKey.WaterInMl:
      return schema.bodyMeasurement.waterInMilliliters
    case BodyMeasurementKey.Steps:
      return schema.bodyMeasurement.steps
    default:
      return AssertUnreachable(key)
  }
}

export const foodMeasurementKeyToColumn = (key: FoodMeasurementKey) => {
  switch (key) {
    case FoodMeasurementKey.Calories:
      return schema.userFood.calories
    case FoodMeasurementKey.Protein:
      return schema.userFood.totalProteinInGrams
    case FoodMeasurementKey.Carbs:
      return schema.userFood.totalCarbsInGrams
    case FoodMeasurementKey.Fats:
      return schema.userFood.totalFatInGrams
    default:
      return AssertUnreachable(key)
  }
}
