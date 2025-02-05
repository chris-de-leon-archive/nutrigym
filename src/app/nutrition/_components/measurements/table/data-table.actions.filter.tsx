"use client"

import { Input } from "@nutrigym/components/ui/input"
import { Table } from "@tanstack/react-table"

export type NutritionMeasurementsDataTableFilterProps<T> = {
  table: Table<T>
}

export function NutritionMeasurementsDataTableFilter<T>({
  table: t,
}: NutritionMeasurementsDataTableFilterProps<T>) {
  return (
    <Input
      placeholder="Filter foods..."
      value={(t.getColumn("key")?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        t.getColumn("key")?.setFilterValue(event.target.value)
      }}
    />
  )
}
