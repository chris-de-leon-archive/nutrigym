"use client"

import { calculatePortion, caloriesToGrams } from "@nutrigym/lib/conversion"
import { GoalChart } from "@nutrigym/components/charts"
import { useMemo } from "react"
import {
  FoodMeasurementsByDateQuery,
  GoalByDateQuery,
} from "@nutrigym/lib/client"

export type NutritionGoalChartsProps = {
  measurements: FoodMeasurementsByDateQuery["foodMeasurementsByDate"]
  goal: GoalByDateQuery["goalByDate"]
}

export function NutritionGoalCharts({
  measurements,
  goal,
}: NutritionGoalChartsProps) {
  const curr = useMemo(() => {
    let calories = 0
    let protein = 0
    let carbs = 0
    let fat = 0
    measurements.forEach((elem) => {
      calories += elem.food.calories
      protein += elem.food.totalProteinInGrams ?? 0
      carbs += elem.food.totalCarbsInGrams ?? 0
      fat += elem.food.totalFatInGrams ?? 0
    })
    return {
      calories,
      protein,
      carbs,
      fat,
    }
  }, [measurements])

  const goals = useMemo(() => {
    const totalGrams = caloriesToGrams(goal?.calories ?? 0)
    return {
      calories: Math.round(goal?.calories ?? 0),
      protein: calculatePortion(goal?.proteinPercentage ?? 0, totalGrams),
      carbs: calculatePortion(goal?.carbsPercentage ?? 0, totalGrams),
      fat: calculatePortion(goal?.fatPercentage ?? 0, totalGrams),
    }
  }, [goal])

  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
      <GoalChart title="Calories" goal={goals.calories} curr={curr.calories} />
      <GoalChart title="Protein (g)" goal={goals.protein} curr={curr.protein} />
      <GoalChart title="Fat (g)" goal={goals.fat} curr={curr.fat} />
      <GoalChart title="Carbs (g)" goal={goals.carbs} curr={curr.carbs} />
    </div>
  )
}
