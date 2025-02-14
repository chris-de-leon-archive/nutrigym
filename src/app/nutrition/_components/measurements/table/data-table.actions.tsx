"use client"

import { NutritionMeasurementsDataTableOptions } from "./data-table.actions.options"
import { NutritionMeasurementsDataTableFilter } from "./data-table.actions.filter"
import { Table } from "@tanstack/react-table"

export type NutritionMeasurementsDataTableActionsProps<
  T extends { id: string },
> = {
  table: Table<T>
  date: string
}

export function NutritionMeasurementsDataTableActions<
  T extends { id: string },
>({ table: t, date: d }: NutritionMeasurementsDataTableActionsProps<T>) {
  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div className="w-4/5 items-start justify-start">
        <NutritionMeasurementsDataTableFilter table={t} />
      </div>
      <div className="flex w-1/5 items-end justify-end">
        <NutritionMeasurementsDataTableOptions table={t} date={d} />
      </div>
    </div>
  )
}
