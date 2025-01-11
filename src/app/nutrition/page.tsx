"use client"

import { DataTableRowSelectorHeader } from "@nutrigym/components/data-table/row/selector-header"
import { DataTableRowSelectorCell } from "@nutrigym/components/data-table/row/selector-cell"
import { DataTableRowActionCell } from "@nutrigym/components/data-table/row/action-cell"
import { DataTableColumnHeader } from "@nutrigym/components/data-table/column/header"
import { DataTable } from "@nutrigym/components/data-table/data-table"
import { GoalChart } from "@nutrigym/components/charts/goal.pie-chart"
import { Button } from "@nutrigym/components/ui/button"
import { Title } from "@nutrigym/components/title"
import { EditIcon, PlusIcon } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

// TODO: fetch from API using tanstack query
const foods = Array.from({ length: 11 }).map((_, i) => {
  return {
    id: i.toString(),
    name: `f${i}`,
    createdAt: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(Date.now() + i * 60000)),
    calories: Number((Math.random() * 1000).toFixed(2)),
    carbs: Number((Math.random() * 1000).toFixed(2)),
    fat: Number((Math.random() * 1000).toFixed(2)),
    protein: Number((Math.random() * 1000).toFixed(2)),
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Food" />
    ),
  },
  {
    accessorKey: "calories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Calories" />
    ),
  },
  {
    accessorKey: "protein",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Protein (g)" />
    ),
  },
  {
    accessorKey: "carbs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carbs (g)" />
    ),
  },
  {
    accessorKey: "fat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fats (g)" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionCell row={row} />,
  },
]

export default function Nutrition() {
  const cals = parseInt(
    foods.reduce((prev, curr) => prev + curr.calories, 0).toFixed(0),
    10,
  )

  const fats = parseInt(
    foods.reduce((prev, curr) => prev + curr.fat, 0).toFixed(0),
    10,
  )

  const carbs = parseInt(
    foods.reduce((prev, curr) => prev + curr.carbs, 0).toFixed(0),
    10,
  )

  const prtn = parseInt(
    foods.reduce((prev, curr) => prev + curr.protein, 0).toFixed(0),
    10,
  )

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <Title name="Nutrition" />
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Goals</span>
            <Button variant="secondary">
              <EditIcon />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
            <GoalChart title="Calories" goal={10000} curr={cals} />
            <GoalChart title="Protein (g)" goal={10000} curr={prtn} />
            <GoalChart title="Fat (g)" goal={10000} curr={fats} />
            <GoalChart title="Carbs (g)" goal={10000} curr={carbs} />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Foods</span>
            <Button variant="secondary">
              <PlusIcon />
            </Button>
          </div>
          <div className="rounded-lg border p-2">
            <DataTable
              className="hidden md:flex md:flex-col"
              columns={columns}
              data={foods}
              visible={{
                createdAt: true,
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
                createdAt: true,
                calories: false,
                protein: false,
                carbs: false,
                fat: false,
                name: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
