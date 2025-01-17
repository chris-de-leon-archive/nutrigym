"use client"

import { GoalChart } from "@nutrigym/components/charts"
import {
  BodyMeasurementByDateQuery,
  GoalByDateQuery,
} from "@nutrigym/lib/client"

export type BodyGoalChartsProps = {
  measurements: BodyMeasurementByDateQuery["bodyMeasurementByDate"]
  goal: GoalByDateQuery["goalByDate"]
}

export function BodyGoalCharts({ measurements, goal }: BodyGoalChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart
        title="Weight (lbs)"
        goal={goal?.weightInPounds ?? 0}
        curr={measurements?.weightInPounds ?? 0}
      />
      <GoalChart
        title="Sleep (hrs)"
        goal={goal?.sleepInHours ?? 0}
        curr={measurements?.sleepInHours ?? 0}
      />
      <GoalChart
        title="Water (ml)"
        goal={goal?.waterInMilliliters ?? 0}
        curr={measurements?.waterInMilliliters ?? 0}
      />
      <GoalChart
        title="Steps"
        goal={goal?.steps ?? 0}
        curr={measurements?.steps ?? 0}
      />
    </div>
  )
}
