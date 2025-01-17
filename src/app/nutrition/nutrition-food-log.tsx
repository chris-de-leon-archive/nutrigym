"use client"

import { FoodMeasurementsByDateQuery } from "@nutrigym/lib/client"
import { formatTime } from "@nutrigym/lib/datetime"
import { ColumnDef } from "@tanstack/react-table"
import {
  DataTableColumnSortableHeader,
  DataTableRowSelectorHeader,
  DataTableRowSelectorCell,
  DataTableRowActionCell,
  DataTable,
} from "@nutrigym/components/data-table"

export type NutritionFoodLogProps = {
  measurements: FoodMeasurementsByDateQuery["foodMeasurementsByDate"]
}

export function NutritionFoodLog(props: NutritionFoodLogProps) {
  const foods = props.measurements.map((elem) => {
    return {
      id: elem.food.id,
      name: elem.food.name,
      protein: elem.food.totalProteinInGrams ?? 0,
      carbs: elem.food.totalCarbsInGrams ?? 0,
      fat: elem.food.totalProteinInGrams ?? 0,
      calories: elem.food.calories,
      time: formatTime(elem.createdAt),
    }
  })

  const columns: ColumnDef<(typeof foods)[number]>[] = [
    {
      id: "select",
      header: ({ table }) => <DataTableRowSelectorHeader table={table} />,
      cell: ({ row }) => <DataTableRowSelectorCell row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Time" />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "calories",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Calories" />
      ),
    },
    {
      accessorKey: "protein",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Protein (g)" />
      ),
    },
    {
      accessorKey: "carbs",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Carbs (g)" />
      ),
    },
    {
      accessorKey: "fat",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Fats (g)" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActionCell row={row} />,
    },
  ]

  return (
    <div className="rounded-lg border p-2">
      <DataTable
        className="hidden md:flex md:flex-col"
        columns={columns}
        data={foods}
        visible={{
          time: true,
          calories: true,
          protein: true,
          carbs: true,
          fat: true,
          name: true,
        }}
      />
      <DataTable
        className="flex flex-col md:hidden"
        columns={columns}
        data={foods}
        visible={{
          time: true,
          calories: false,
          protein: false,
          carbs: false,
          fat: false,
          name: true,
        }}
      />
    </div>
  )
}
