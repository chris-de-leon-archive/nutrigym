"use client"

import { BodyMeasurementByDateQuery } from "@nutrigym/lib/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nutrigym/components/ui/table"

export type BodyDataTableProps = {
  log: BodyMeasurementByDateQuery["measurementsByDate"]
}

export function BodyDataTable(props: BodyDataTableProps) {
  const table = [
    {
      id: "steps",
      name: "Steps",
      value: props.log?.bodyMeasurement?.steps?.toString(),
    },
    {
      id: "weight",
      name: "Weight (lbs)",
      value: props.log?.bodyMeasurement?.weightInPounds.toString(),
    },
    {
      id: "height",
      name: "Height (inches)",
      value: props.log?.bodyMeasurement?.heightInInches.toString(),
    },
    {
      id: "water",
      name: "Water (ml)",
      value: props.log?.bodyMeasurement?.waterInMilliliters?.toString(),
    },
    {
      id: "sleep",
      name: "Sleep (hours)",
      value: props.log?.bodyMeasurement?.sleepInHours?.toString(),
    },
    {
      id: "waist",
      name: "Waist (inches)",
      value: props.log?.bodyMeasurement?.waistInInches?.toString(),
    },
    {
      id: "hips",
      name: "Hips (inches)",
      value: props.log?.bodyMeasurement?.hipsInInches?.toString(),
    },
    {
      id: "chest",
      name: "Chest (inches)",
      value: props.log?.bodyMeasurement?.chestInInches?.toString(),
    },
    {
      id: "arms",
      name: "Arms (inches)",
      value: props.log?.bodyMeasurement?.armsInInches?.toString(),
    },
    {
      id: "thighs",
      name: "Thighs (inches)",
      value: props.log?.bodyMeasurement?.thighsInInches?.toString(),
    },
    {
      id: "shoulders",
      name: "Shoulders (inches)",
      value: props.log?.bodyMeasurement?.shouldersInInches?.toString(),
    },
    {
      id: "forearms",
      name: "Forearms (inches)",
      value: props.log?.bodyMeasurement?.forearmsInInches?.toString(),
    },
    {
      id: "calves",
      name: "Calves (inches)",
      value: props.log?.bodyMeasurement?.calvesInInches?.toString(),
    },
    {
      id: "neck",
      name: "Neck (inches)",
      value: props.log?.bodyMeasurement?.neckInInches?.toString(),
    },
  ]

  return (
    <div className="rounded-lg border p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
