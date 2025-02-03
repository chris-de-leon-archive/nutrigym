"use client"

import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { useRouter } from "next/navigation"
import {
  RemoveFoodMeasurementsDocument,
  FoodMeasurement,
} from "@nutrigym/lib/client/graphql"

export type NutritionMeasurementsDeleteButtonProps = {
  measurements: FoodMeasurement[]
  date: Date
}

export function NutritionMeasurementsDeleteButton(
  props: NutritionMeasurementsDeleteButtonProps,
) {
  const router = useRouter()

  return (
    <DeleteButton
      message={`This will delete all food measurements for ${DateTime.prettyLocalDate(props.date)}. This action cannot be undone.`}
      onDelete={() => {
        makeRequestOrThrow(RemoveFoodMeasurementsDocument, {
          ids: props.measurements.map(({ id }) => id),
          date: DateTime.asApiDateString(props.date),
        }).then(() => {
          router.refresh()
        })
      }}
    />
  )
}
