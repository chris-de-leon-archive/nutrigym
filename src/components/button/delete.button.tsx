"use client"

import { Button } from "@nutrigym/components/ui/button"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@nutrigym/components/ui/alert-dialog"

export type DeleteButtonProps = {
  onDelete: () => void
  disabled?: boolean
  message?: string
}

export function DeleteButton(props: DeleteButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-11/12">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {props.message ??
                "This action cannot be undone. This will permanently delete the selected items."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowDeleteDialog(false)
                props.onDelete()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        disabled={props.disabled}
        onClick={() => setShowDeleteDialog(true)}
        variant="destructive"
      >
        <TrashIcon />
      </Button>
    </>
  )
}
