import { Checkbox } from "@nutrigym/components/ui/checkbox"
import { Table } from "@tanstack/react-table"

interface DataTableRowSelectorHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableRowSelectorHeader<TData>({
  table,
}: DataTableRowSelectorHeaderProps<TData>) {
  return (
    <Checkbox
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
    />
  )
}
