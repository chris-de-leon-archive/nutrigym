"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@nutrigym/components/ui/button"
import { Table } from "@tanstack/react-table"

export type NutritionMeasurementsDataTableNavigationProps<T> = {
  table: Table<T>
}

export function NutritionMeasurementsDataTableNavigation<T>({
  table: t,
}: NutritionMeasurementsDataTableNavigationProps<T>) {
  const totalPages = t.getPageCount()
  return (
    <div className="flex flex-row items-center justify-between p-2">
      <p className="text-center">
        {totalPages === 0
          ? "Page 0 of 0"
          : `Page ${t.getState().pagination.pageIndex + 1} of ${totalPages}`}
      </p>
      <div className="flex flex-row items-center gap-x-2">
        <Button
          variant="outline"
          onClick={() => t.previousPage()}
          disabled={!t.getCanPreviousPage()}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="outline"
          onClick={() => t.nextPage()}
          disabled={!t.getCanNextPage()}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}
