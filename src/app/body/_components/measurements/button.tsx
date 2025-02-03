"use client"

import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { useRouter } from "next/navigation"
import {
  RemoveBodyMeasurementsDocument,
  BodyMeasurement,
} from "@nutrigym/lib/client/graphql"

export type BodyMeasurementsDeleteButtonProps = {
  measurements: BodyMeasurement[]
  date: Date
}

export function BodyMeasurementsDeleteButton(
  props: BodyMeasurementsDeleteButtonProps,
) {
  const router = useRouter()

  return (
    <DeleteButton
      message={`This will delete all body measurements for ${DateTime.prettyLocalDate(props.date)}. This action cannot be undone.`}
      onDelete={() => {
        makeRequestOrThrow(RemoveBodyMeasurementsDocument, {
          ids: props.measurements.map(({ id }) => id),
          date: DateTime.asApiDateString(props.date),
        }).then(() => {
          router.refresh()
        })
      }}
    />
  )
}
