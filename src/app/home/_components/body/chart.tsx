import { ProgressLineChart } from "@nutrigym/components/charts"
import { randVals } from "../../_lib"

export function BodyChart() {
  const weights = randVals()
  const sleep = randVals()
  const water = randVals()
  const steps = randVals()

  return (
    <ProgressLineChart
      title="Personal"
      defaults={{
        datasetId: "weight",
        timeRange: "7d",
      }}
      datasets={[
        {
          id: "weight",
          label: "Weight",
          units: "(lbs)",
          color: "hsl(var(--chart-1))",
          points: weights,
        },
        {
          id: "sleep",
          label: "Sleep",
          units: "(hrs)",
          color: "hsl(var(--chart-2))",
          points: sleep,
        },
        {
          id: "water",
          label: "Water",
          units: "(ml)",
          color: "hsl(var(--chart-3))",
          points: water,
        },
        {
          id: "steps",
          label: "Steps",
          units: "",
          color: "hsl(var(--chart-4))",
          points: steps,
        },
      ]}
    />
  )
}
