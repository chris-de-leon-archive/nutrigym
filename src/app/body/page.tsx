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
const measurements = {
  waterInMilliliters: Number((Math.random() * 1000).toFixed(2)),
  weightInPounds: Number((Math.random() * 1000).toFixed(2)),
  sleepInHours: Number((Math.random() * 1000).toFixed(2)),
  steps: Number((Math.random() * 1000).toFixed(2)),
}

const columns: ColumnDef<{
  name: string
  value: string
}>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableRowSelectorHeader table={table} />,
    cell: ({ row }) => <DataTableRowSelectorCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionCell row={row} />,
  },
]

export default function Body() {
  const data = Object.entries(measurements).map(([k, v]) => ({
    name: k,
    value: v.toString(),
  }))

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <Title name="Body" />
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Goals</span>
            <Button variant="secondary">
              <EditIcon />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
            <GoalChart title="Weight (lbs)" goal={1000} curr={500} />
            <GoalChart title="Sleep (hrs)" goal={1000} curr={250} />
            <GoalChart title="Water (ml)" goal={1000} curr={750} />
            <GoalChart title="Steps" goal={1000} curr={900} />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Measurements</span>
            <Button variant="secondary">
              <PlusIcon />
            </Button>
          </div>
          <div className="rounded-lg border p-2">
            <DataTable
              className="hidden md:flex md:flex-col"
              columns={columns}
              data={data}
              visible={{}}
            />
            <DataTable
              className="flex flex-col md:hidden"
              columns={columns}
              data={data}
              visible={{}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
