"use client"

import { RemoveBodyDocument } from "@nutrigym/lib/client/graphql"
import { DeleteButton } from "@nutrigym/components/button"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { useRouter } from "next/navigation"

export function PersonalInfoDeleteButton() {
  const router = useRouter()

  return (
    <DeleteButton
      message="This will delete all your personal info. This action cannot be undone."
      onDelete={() => {
        makeRequestOrThrow(RemoveBodyDocument, {}).then(() => {
          router.refresh()
        })
      }}
    />
  )
}
