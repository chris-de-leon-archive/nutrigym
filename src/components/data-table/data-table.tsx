"use client"

import { DeleteButton } from "@nutrigym/components/button"
import { DataTableNavigation } from "./navigation"
import { DataTableOptions } from "./options"
import { cn } from "@nutrigym/lib/utils"
import { type ClassValue } from "clsx"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nutrigym/components/ui/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue, TColumn extends keyof TData> {
  className?: ClassValue

  columns: ColumnDef<TData, TValue>[]
  visible: Record<TColumn, boolean>
  data: TData[]

  onDelete?: (rows: Row<TData>[]) => void
}

export function DataTable<TData, TValue, TColumn extends keyof TData>({
  onDelete,
  className,
  columns,
  visible,
  data,
}: DataTableProps<TData, TValue, TColumn>) {
  const [colVisibility, setColVisibility] = useState<VisibilityState>(visible)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,

    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),

    onColumnVisibilityChange: setColVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,

    enableRowSelection: true,
    state: {
      columnVisibility: colVisibility,
      rowSelection: rowSelection,
      sorting,
    },
  })

  const canDelete = table.getFilteredSelectedRowModel().rows.length > 0
  const handleDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (onDelete != null) {
      onDelete(selectedRows)
    }
    setRowSelection({})
  }

  return (
    <div className={cn(className)}>
      {/* Top Portion */}
      <div className="flex w-full flex-row items-center justify-between p-3">
        <div className="flex w-3/4 flex-row items-center justify-start gap-x-2">
          <DataTableOptions table={table} />
          <DeleteButton disabled={!canDelete} onDelete={handleDelete} />
        </div>
        <div className="flex w-1/4 justify-end text-center text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Portion */}
      <div className="flex justify-center p-2">
        <DataTableNavigation table={table} />
      </div>
    </div>
  )
}
