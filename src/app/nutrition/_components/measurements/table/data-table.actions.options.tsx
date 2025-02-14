"use client"

import { RemoveFoodMeasurementsDocument } from "@nutrigym/lib/client/graphql"
import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Table } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

export type NutritionMeasurementsDataTableOptionsProps<
  T extends { id: string },
> = {
  table: Table<T>
  date: string
}

export function NutritionMeasurementsDataTableOptions<
  T extends { id: string },
>({ table: t, date: d }: NutritionMeasurementsDataTableOptionsProps<T>) {
  const router = useRouter()

  const data = {
    ids: t.getRowModel().rows.map((r) => r.original.id),
    date: d,
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
