"use client"

import { BodyMeasurementByDateQuery } from "@nutrigym/lib/client"
import { Border } from "@nutrigym/components/border"
import { BodyLabels } from "./labels"
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
  const table = BodyLabels.entries()
    .toArray()
    .map(([k, v]) => {
      const bodyMeasurement = props.log?.bodyMeasurement
      return {
        id: k,
        name: v,
        value: bodyMeasurement?.[k]?.toString(),
      }
    })

  return (
    <Border>
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
    </Border>
  )
}
