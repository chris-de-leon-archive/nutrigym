import { DataTableColumnFilter } from "./column-filter"
import { Button } from "@nutrigym/components/ui/button"
import { SlidersHorizontalIcon } from "lucide-react"
import { DataTablePageSize } from "./page-size"
import { Table } from "@tanstack/react-table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

interface DataTableOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableOptions<TData>({
  table,
}: DataTableOptionsProps<TData>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <SlidersHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-w-fit flex-col gap-y-2">
        <DataTablePageSize table={table} />
        <DataTableColumnFilter table={table} />
      </PopoverContent>
    </Popover>
  )
}
