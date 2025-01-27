import { BodyMeasurementKey } from "@nutrigym/lib/client/graphql"
import { BodyMeasurementChartTitle } from "./enums"

const datasets = new Map<
  BodyMeasurementKey,
  {
    title: BodyMeasurementChartTitle
    label: string
    units: string
    color: string
  }
>([
  [
    BodyMeasurementKey.WeightInLbs,
    {
      title: BodyMeasurementChartTitle.Weight,
      label: "Weight",
      units: "(lbs)",
      color: "hsl(var(--chart-1))",
    },
  ],
  [
    BodyMeasurementKey.WaterInMl,
    {
      title: BodyMeasurementChartTitle.Water,
      label: "Water",
      units: "(ml)",
      color: "hsl(var(--chart-2))",
    },
  ],
  [
    BodyMeasurementKey.SleepInHrs,
    {
      title: BodyMeasurementChartTitle.Sleep,
      label: "Sleep",
      units: "(hrs)",
      color: "hsl(var(--chart-3))",
    },
  ],
  [
    BodyMeasurementKey.Steps,
    {
      title: BodyMeasurementChartTitle.Steps,
      label: "Steps",
      units: "",
      color: "hsl(var(--chart-4))",
    },
  ],
])

export const getBodyDatasetDetails = (key: BodyMeasurementKey) => {
  const v = datasets.get(key)
  if (v == null) {
    throw new Error(`invalid chart: ${key}`)
  } else {
    return v
  }
}
