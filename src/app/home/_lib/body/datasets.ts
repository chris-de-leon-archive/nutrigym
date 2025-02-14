import { BodyMeasurementKey } from "@nutrigym/lib/client/graphql"
import { AssertUnreachable } from "@nutrigym/lib/assert"
import { BodyMeasurementChartTitle } from "./enums"

export const getBodyDatasetDetails = (key: BodyMeasurementKey) => {
  switch (key) {
    case BodyMeasurementKey.WeightInLbs:
      return {
        title: BodyMeasurementChartTitle.Weight,
        label: "Weight",
        units: "(lbs)",
        color: "var(--chart-1)",
      }
    case BodyMeasurementKey.SleepInHrs:
      return {
        title: BodyMeasurementChartTitle.Water,
        label: "Water",
        units: "(ml)",
        color: "var(--chart-2)",
      }
    case BodyMeasurementKey.WaterInMl:
      return {
        title: BodyMeasurementChartTitle.Sleep,
        label: "Sleep",
        units: "(hrs)",
        color: "var(--chart-3)",
      }
    case BodyMeasurementKey.Steps:
      return {
        title: BodyMeasurementChartTitle.Steps,
        label: "Steps",
        units: "",
        color: "var(--chart-4)",
      }
    default:
      return AssertUnreachable(key)
  }
}
