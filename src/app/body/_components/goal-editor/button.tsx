"use client"

import { Goal, RemoveGoalsDocument } from "@nutrigym/lib/client/graphql"
import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { useRouter } from "next/navigation"

type BodyGoalDeleteButtonProps = {
  goal: Goal
}

export function BodyGoalDeleteButton(props: BodyGoalDeleteButtonProps) {
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
