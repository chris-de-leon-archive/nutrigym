"use client"

import { FoodMeasurement, Goal } from "@nutrigym/lib/client/graphql"
import { Conversion } from "@nutrigym/lib/client/common"
import { GoalChart } from "@nutrigym/components/charts"
import { useMemo } from "react"

export type NutritionChartsProps = {
  measurements: FoodMeasurement[]
  goal: Goal
}

export function NutritionCharts({ measurements, goal }: NutritionChartsProps) {
  const curr = useMemo(() => {
    let [calories, proteinInGrams, carbsInGrams, fatInGrams] = [0, 0, 0, 0]
    measurements.forEach((elem) => {
      const p = elem.food.totalProteinInGrams ?? 0
      const c = elem.food.totalCarbsInGrams ?? 0
      const f = elem.food.totalFatInGrams ?? 0
      proteinInGrams += elem.servingsConsumed * p
      carbsInGrams += elem.servingsConsumed * c
      fatInGrams += elem.servingsConsumed * f
      calories += elem.servingsConsumed * elem.food.calories
    })
    return {
      proteinInGrams,
      carbsInGrams,
      fatInGrams,
      calories,
    }
  }, [measurements])

  const goals = useMemo(() => {
    const p = goal.proteinPercentage ?? 0
    const c = goal.carbsPercentage ?? 0
    const f = goal.fatPercentage ?? 0
    return {
      proteinInGrams: Math.round(Conversion.proteinInGrams(goal.calories, p)),
      carbsInGrams: Math.round(Conversion.carbsInGrams(goal.calories, c)),
      fatInGrams: Math.round(Conversion.fatInGrams(goal.calories, f)),
      calories: Math.round(goal.calories),
    }
  }, [goal])

  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart title="Calories" goal={goals.calories} curr={curr.calories} />
      <GoalChart
        title="Protein (g)"
        goal={goals.proteinInGrams}
        curr={curr.proteinInGrams}
      />
      <GoalChart
        title="Fat (g)"
        goal={goals.fatInGrams}
        curr={curr.fatInGrams}
      />
      <GoalChart
        title="Carbs (g)"
        goal={goals.carbsInGrams}
        curr={curr.carbsInGrams}
      />
    </div>
  )
}
