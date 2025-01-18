"use client"

import { GoalChart } from "@nutrigym/components/charts"
import {
  BodyMeasurementByDateQuery,
  GoalByDateQuery,
} from "@nutrigym/lib/client"

export type BodyChartsProps = {
  log: BodyMeasurementByDateQuery["measurementsByDate"]
  goal: GoalByDateQuery["goalByDate"]
}

export function BodyCharts({ log, goal }: BodyChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart
        title="Weight (lbs)"
        goal={goal?.weightInPounds ?? 0}
        curr={log?.bodyMeasurement?.weightInPounds ?? 0}
      />
      <GoalChart
        title="Sleep (hrs)"
        goal={goal?.sleepInHours ?? 0}
        curr={log?.bodyMeasurement?.sleepInHours ?? 0}
      />
      <GoalChart
        title="Water (ml)"
        goal={goal?.waterInMilliliters ?? 0}
        curr={log?.bodyMeasurement?.waterInMilliliters ?? 0}
      />
      <GoalChart
        title="Steps"
        goal={goal?.steps ?? 0}
        curr={log?.bodyMeasurement?.steps ?? 0}
      />
    </div>
  )
}
