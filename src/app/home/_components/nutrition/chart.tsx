import { ProgressLineChart } from "@nutrigym/components/charts"
import { randVals } from "../../_lib"

export function NutritionChart() {
  const carbs = randVals()
  const prtns = randVals()
  const fats = randVals()
  const cals = randVals()

  return (
    <ProgressLineChart
      title="Macros"
      defaults={{
        datasetId: "calories",
        timeRange: "7d",
      }}
      datasets={[
        {
          id: "calories",
          label: "Calories",
          units: "",
          color: "hsl(var(--chart-1))",
          points: cals,
        },
        {
          id: "protein",
          label: "Protein",
          units: "(g)",
          color: "hsl(var(--chart-2))",
          points: prtns,
        },
        {
          id: "fats",
          label: "Fats",
          units: "(g)",
          color: "hsl(var(--chart-3))",
          points: fats,
        },
        {
          id: "carbs",
          label: "Carbs",
          units: "(g)",
          color: "hsl(var(--chart-4))",
          points: carbs,
        },
      ]}
    />
  )
}
