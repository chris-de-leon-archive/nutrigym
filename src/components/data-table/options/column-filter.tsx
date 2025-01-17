import { Checkbox } from "@nutrigym/components/ui/checkbox"
import { Label } from "@nutrigym/components/ui/label"
import { Table } from "@tanstack/react-table"

interface DataTableColumnFilterProps<TData> {
  table: Table<TData>
}

export function DataTableColumnFilter<TData>({
  table,
}: DataTableColumnFilterProps<TData>) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-sm font-medium">Columns</p>
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        )
        .map((column, i) => {
          return (
            <div
              key={i}
              className="flex flex-row items-center justify-start gap-x-2"
            >
              <Checkbox
                id={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              />
              <Label htmlFor={column.id}>{column.id}</Label>
            </div>
          )
        })}
    </div>
  )
}
