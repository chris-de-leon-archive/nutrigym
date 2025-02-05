import { flexRender, Table as TanstackTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@nutrigym/components/ui/table"

interface NutritionMeasurementsDataTableContentProps<T> {
  table: TanstackTable<T>
}

export function NutritionMeasurementsDataTableContent<T>({
  table,
}: NutritionMeasurementsDataTableContentProps<T>) {
  const TableRows = () => {
    if ((table.getRowModel().rows?.length ?? 0) === 0) {
      return (
        <TableRow>
          <TableCell colSpan={1} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )
    } else {
      return table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} className="border-none">
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    }
  }

  return (
    <Table>
      <TableBody>
        <TableRows />
      </TableBody>
    </Table>
  )
}
