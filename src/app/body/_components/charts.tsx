"use client"

import { BodyMeasurement, Goal } from "@nutrigym/lib/client"
import { GoalChart } from "@nutrigym/components/charts"
import { BodyLabels } from "../_lib"

export type BodyChartsProps = {
  measurement: BodyMeasurement | null | undefined
  goal: Goal
}

export function BodyCharts({ measurement, goal }: BodyChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart
        title={BodyLabels.get("weightInPounds")}
        goal={goal.weightInPounds ?? 0}
        curr={measurement?.weightInPounds ?? 0}
      />
      <GoalChart
        title={BodyLabels.get("sleepInHours")}
        goal={goal.sleepInHours ?? 0}
        curr={measurement?.sleepInHours ?? 0}
      />
      <GoalChart
        title={BodyLabels.get("waterInMilliliters")}
        goal={goal.waterInMilliliters ?? 0}
        curr={measurement?.waterInMilliliters ?? 0}
      />
      <GoalChart
        title={BodyLabels.get("steps")}
        goal={goal.steps ?? 0}
        curr={measurement?.steps ?? 0}
      />
    </div>
  )
}
