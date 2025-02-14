import { FoodMeasurementKey } from "@nutrigym/lib/client/graphql"
import { AssertUnreachable } from "@nutrigym/lib/assert"
import { FoodMeasurementChartTitle } from "./enums"

export const getNutritionDatasetDetails = (key: FoodMeasurementKey) => {
  switch (key) {
    case FoodMeasurementKey.Calories:
      return {
        title: FoodMeasurementChartTitle.Calories,
        label: "Calories",
        units: "",
        color: "var(--chart-1)",
      }
    case FoodMeasurementKey.Protein:
      return {
        title: FoodMeasurementChartTitle.Protein,
        label: "Protein",
        units: "(g)",
        color: "var(--chart-2)",
      }
    case FoodMeasurementKey.Carbs:
      return {
        title: FoodMeasurementChartTitle.Carbs,
        label: "Carbs",
        units: "(g)",
        color: "var(--chart-3)",
      }
    case FoodMeasurementKey.Fats:
      return {
        title: FoodMeasurementChartTitle.Fats,
        label: "Fats",
        units: "(g)",
        color: "var(--chart-4)",
      }
    default:
      return AssertUnreachable(key)
  }
}
