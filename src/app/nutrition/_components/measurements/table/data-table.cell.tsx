"use client"

import { NutritionMeasurementCellActions } from "./data-table.cell.actions"
import { Food, FoodMeasurement } from "@nutrigym/lib/client/graphql"
import { Fmt } from "@nutrigym/lib/client/common"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nutrigym/components/ui/card"

export type NutritionMeasurementCellProps = {
  measurement: FoodMeasurement
  foods: Food[]
  date: Date
}

export function NutritionMeasurementCell({
  measurement: m,
  foods: f,
  date: d,
}: NutritionMeasurementCellProps) {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between">
        <NutritionMeasurementCellActions measurement={m} foods={f} date={d} />
        <CardHeader className="w-full">
          <div className="flex flex-col gap-y-1">
            <CardTitle>
              <div className="flex flex-row items-center justify-between">
                <p className="w-1/2 overflow-clip text-ellipsis text-sm">
                  {m.food.name}
                </p>
                <p className="text-sm">
                  {Fmt.formatNumber(
                    (m.food.calories ?? 0) * m.servingsConsumed,
                  )}{" "}
                  Calories
                </p>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">
                    {m.servingsConsumed} {m.food.servingUnit}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <div className="flex flex-row items-center gap-x-2">
                    <p className="text-xs">
                      P:{" "}
                      {Fmt.formatNumber(
                        (m.food.totalProteinInGrams ?? 0) * m.servingsConsumed,
                      )}
                    </p>
                    <p className="text-xs">
                      C:{" "}
                      {Fmt.formatNumber(
                        (m.food.totalCarbsInGrams ?? 0) * m.servingsConsumed,
                      )}
                    </p>
                    <p className="text-xs">
                      F:{" "}
                      {Fmt.formatNumber(
                        (m.food.totalFatInGrams ?? 0) * m.servingsConsumed,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
      </div>
    </Card>
  )
}
