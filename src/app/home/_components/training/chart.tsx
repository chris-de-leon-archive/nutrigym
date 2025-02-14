import { ProgressLineChart } from "@nutrigym/components/charts"
import { randVals } from "../../_lib"

export function TrainingChart() {
  const deadliftLbs = randVals()
  const benchLbs = randVals()
  const squatLbs = randVals()

  return (
    <ProgressLineChart
      title="Exercise Strength"
      defaults={{
        datasetId: "bench",
        timeRange: "7d",
      }}
      datasets={[
        {
          id: "bench",
          label: "Bench",
          units: "(lbs)",
          color: "var(--chart-1)",
          points: benchLbs,
        },
        {
          id: "squat",
          label: "Squat",
          units: "(lbs)",
          color: "var(--chart-3)",
          points: squatLbs,
        },
        {
          id: "deadlift",
          label: "Deadlift",
          units: "(lbs)",
          color: "var(--chart-4)",
          points: deadliftLbs,
        },
      ]}
    />
  )
}
