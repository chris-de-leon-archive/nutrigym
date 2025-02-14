"use client"

import { NutritionMeasurementsDataTableActions } from "./data-table.actions"
import { NutritionMeasurementsDataTableContent } from "./data-table.content"
import { NutritionMeasurementsDataTableNavigation } from "./data-table.nav"
import { Food, FoodMeasurement } from "@nutrigym/lib/client/graphql"
import { NutritionMeasurementCell } from "./data-table.cell"
import { useMemo, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

export type NutritionMeasurementsDataTableProps = {
  measurements: FoodMeasurement[]
  foods: Food[]
  date: string
}

export function NutritionMeasurementsDataTable(
  props: NutritionMeasurementsDataTableProps,
) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const data = useMemo(() => {
    return props.measurements.map((m) => {
      return {
        key: `${m.food.name} ${m.food.brand}`,
        ...m,
      }
    })
  }, [props.measurements])

  const column: ColumnDef<(typeof data)[number]> = {
    accessorKey: "key",
    cell: ({ row }) => (
      <NutritionMeasurementCell
        measurement={row.original}
        foods={props.foods}
        date={props.date}
      />
    ),
  }

  const table = useReactTable({
    columns: [column],
    data,

    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,

    state: {
      columnFilters,
    },
  })

  return (
    <div className="grid grid-cols-1 gap-2 rounded border p-2">
      <NutritionMeasurementsDataTableActions table={table} date={props.date} />
      <NutritionMeasurementsDataTableContent table={table} />
      <NutritionMeasurementsDataTableNavigation table={table} />
    </div>
  )
}
