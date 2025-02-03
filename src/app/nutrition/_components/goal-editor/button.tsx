"use client"

import { Goal, RemoveGoalsDocument } from "@nutrigym/lib/client/graphql"
import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { useRouter } from "next/navigation"

type NutritionGoalDeleteButtonProps = {
  goal: Goal
}

export function NutritionGoalDeleteButton(
  props: NutritionGoalDeleteButtonProps,
) {
  const router = useRouter()

  const date = DateTime.prettyLocalDate(
    DateTime.parseApiDateString(props.goal.date),
  )

  return (
    <DeleteButton
      message={`This will delete the goal you set on ${date}. This action cannot be undone.`}
      onDelete={() => {
        makeRequestOrThrow(RemoveGoalsDocument, {
          ids: [props.goal.id],
        }).then(() => {
          router.refresh()
        })
      }}
    />
  )
}
