"use client"

import { RemoveFoodMeasurementsDocument } from "@nutrigym/lib/client/graphql"
import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { Table } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

export type NutritionMeasurementsDataTableOptionsProps<
  T extends { id: string },
> = {
  table: Table<T>
  date: Date
}

export function NutritionMeasurementsDataTableOptions<
  T extends { id: string },
>({ table: t, date: d }: NutritionMeasurementsDataTableOptionsProps<T>) {
  const router = useRouter()

  const data = {
    ids: t.getRowModel().rows.map((r) => r.original.id),
    date: DateTime.asApiDateString(d),
  }

  const onDelete = () => {
    makeRequestOrThrow(RemoveFoodMeasurementsDocument, data).then(() => {
      router.refresh()
    })
  }

  return (
    <DeleteButton
      onDelete={onDelete}
      message={
        "This will delete all measurements in this category. This action cannot be undone."
      }
      disabled={data.ids.length === 0}
    />
  )
}
