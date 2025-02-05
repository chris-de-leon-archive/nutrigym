"use client"

import { Card, CardContent } from "@nutrigym/components/ui/card"
import { BodyMeasurement } from "@nutrigym/lib/client/graphql"
import { BodyLabels } from "../../../_lib"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nutrigym/components/ui/table"

export type BodyMeasurementsTableProps = {
  measurement: BodyMeasurement | null | undefined
}

export function BodyMeasurementsTable(props: BodyMeasurementsTableProps) {
  const table = Array.from(BodyLabels.entries()).map(([k, v]) => {
    return {
      id: k,
      name: v,
      value: props.measurement?.[k]?.toString(),
    }
  })

  return (
    <Card>
      <CardContent className="p-2">
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
      </CardContent>
    </Card>
  )
}
