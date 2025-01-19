"use client"

import { formatTime, stringToDate } from "@nutrigym/lib/datetime"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { NutritionLabels } from "./labels"
import {
  DataTableColumnSortableHeader,
  DataTableRowSelectorHeader,
  DataTableRowSelectorCell,
  DataTableRowActionCell,
  DataTable,
} from "@nutrigym/components/data-table"
import {
  FoodMeasurementsByDateQuery,
  makeRequestOrThrow,
  RemoveMeasurementsDocument,
} from "@nutrigym/lib/client"

export type NutritionDataTableProps = {
  log: FoodMeasurementsByDateQuery["measurementsByDate"]
}

export function NutritionDataTable(props: NutritionDataTableProps) {
  const router = useRouter()

  const foods = (props.log?.foodMeasurements ?? []).map((elem) => {
    return {
      id: elem.food.id,
      measurementId: elem.id,
      name: elem.food.name,
      quantity: elem.servingsConsumed,
      protein: elem.servingsConsumed * (elem.food.totalProteinInGrams ?? 0),
      carbs: elem.servingsConsumed * (elem.food.totalCarbsInGrams ?? 0),
      fat: elem.servingsConsumed * (elem.food.totalProteinInGrams ?? 0),
      calories: elem.servingsConsumed * elem.food.calories,
      time: formatTime(stringToDate(elem.createdAt)),
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
        <DataTableColumnSortableHeader
          column={column}
          title={NutritionLabels.get("name")}
        />
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Quantity" />
      ),
    },
    {
      accessorKey: "calories",
      header: ({ column }) => (
        <DataTableColumnSortableHeader
          column={column}
          title={NutritionLabels.get("calories")}
        />
      ),
    },
    {
      accessorKey: "protein",
      header: ({ column }) => (
        <DataTableColumnSortableHeader
          column={column}
          title={NutritionLabels.get("totalProteinInGrams")}
        />
      ),
    },
    {
      accessorKey: "carbs",
      header: ({ column }) => (
        <DataTableColumnSortableHeader
          column={column}
          title={NutritionLabels.get("totalCarbsInGrams")}
        />
      ),
    },
    {
      accessorKey: "fat",
      header: ({ column }) => (
        <DataTableColumnSortableHeader
          column={column}
          title={NutritionLabels.get("totalFatInGrams")}
        />
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
          name: true,
          quantity: true,
          calories: true,
          protein: true,
          carbs: true,
          fat: true,
        }}
        onDelete={(row) => {
          if (props.log != null) {
            makeRequestOrThrow(RemoveMeasurementsDocument, {
              id: props.log.id,
              data: {
                foodIds: row.map((r) => r.original.measurementId),
                bodyIds: [],
              },
            }).then(() => {
              router.refresh()
            })
          }
        }}
      />
      <DataTable
        className="flex flex-col md:hidden"
        columns={columns}
        data={foods}
        visible={{
          time: true,
          name: true,
          quantity: true,
          calories: false,
          protein: false,
          carbs: false,
          fat: false,
        }}
        onDelete={(row) => {
          if (props.log != null) {
            makeRequestOrThrow(RemoveMeasurementsDocument, {
              id: props.log.id,
              data: {
                foodIds: row.map((r) => r.original.measurementId),
                bodyIds: [],
              },
            }).then(() => {
              router.refresh()
            })
          }
        }}
      />
    </div>
  )
}
