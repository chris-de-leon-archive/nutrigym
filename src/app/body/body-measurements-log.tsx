"use client"

import { BodyMeasurementByDateQuery } from "@nutrigym/lib/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  DataTableColumnSortableHeader,
  DataTableRowSelectorHeader,
  DataTableRowSelectorCell,
  DataTableRowActionCell,
  DataTable,
} from "@nutrigym/components/data-table"

export type BodyMeasurementsLogProps = {
  measurements: BodyMeasurementByDateQuery["bodyMeasurementByDate"]
}

export function BodyMeasurementsLog(props: BodyMeasurementsLogProps) {
  const body = [
    {
      id: "steps",
      name: "Steps",
      value: props.measurements?.steps?.toString(),
    },
    {
      id: "weight",
      name: "Weight (lbs)",
      value: props.measurements?.weightInPounds.toString(),
    },
    {
      id: "height",
      name: "Height (inches)",
      value: props.measurements?.heightInInches.toString(),
    },
    {
      id: "water",
      name: "Water (ml)",
      value: props.measurements?.waterInMilliliters?.toString(),
    },
    {
      id: "sleep",
      name: "Sleep (hours)",
      value: props.measurements?.sleepInHours?.toString(),
    },
    {
      id: "waist",
      name: "Waist (inches)",
      value: props.measurements?.waistInInches?.toString(),
    },
    {
      id: "hips",
      name: "Hips (inches)",
      value: props.measurements?.hipsInInches?.toString(),
    },
    {
      id: "chest",
      name: "Chest (inches)",
      value: props.measurements?.chestInInches?.toString(),
    },
    {
      id: "arms",
      name: "Arms (inches)",
      value: props.measurements?.armsInInches?.toString(),
    },
    {
      id: "thighs",
      name: "Thighs (inches)",
      value: props.measurements?.thighsInInches?.toString(),
    },
    {
      id: "shoulders",
      name: "Shoulders (inches)",
      value: props.measurements?.shouldersInInches?.toString(),
    },
    {
      id: "forearms",
      name: "Forearms (inches)",
      value: props.measurements?.forearmsInInches?.toString(),
    },
    {
      id: "calves",
      name: "Calves (inches)",
      value: props.measurements?.calvesInInches?.toString(),
    },
    {
      id: "neck",
      name: "Neck (inches)",
      value: props.measurements?.neckInInches?.toString(),
    },
  ]

  const columns: ColumnDef<(typeof body)[number]>[] = [
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
        <DataTableColumnSortableHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "value",
      header: ({ column }) => (
        <DataTableColumnSortableHeader column={column} title="Value" />
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
        data={body}
        visible={{}}
      />
      <DataTable
        className="flex flex-col md:hidden"
        columns={columns}
        data={body}
        visible={{}}
      />
    </div>
  )
}
