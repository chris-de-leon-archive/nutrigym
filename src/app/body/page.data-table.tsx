"use client"

import { BodyMeasurement } from "@nutrigym/lib/client"
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
  measurement: BodyMeasurement | null | undefined
}

export function BodyDataTable(props: BodyDataTableProps) {
  const table = Array.from(BodyLabels.entries()).map(([k, v]) => {
    return {
      id: k,
      name: v,
      value: props.measurement?.[k]?.toString(),
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
