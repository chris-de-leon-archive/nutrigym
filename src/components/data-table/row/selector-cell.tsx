import { Checkbox } from "@nutrigym/components/ui/checkbox"
import { Row } from "@tanstack/react-table"

interface DataTableRowSelectorCellProps<TData> {
  row: Row<TData>
}

export function DataTableRowSelectorCell<TData>({
  row,
}: DataTableRowSelectorCellProps<TData>) {
  return (
    <Checkbox
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      checked={row.getIsSelected()}
    />
  )
}
