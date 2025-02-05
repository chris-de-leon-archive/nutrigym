"use client"

import { Goal, RemoveGoalsDocument } from "@nutrigym/lib/client/graphql"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/client/common"
import { MoreHorizontalIcon } from "lucide-react"
import { BodyGoalEditorForm } from "./form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@nutrigym/components/ui/dropdown-menu"
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
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@nutrigym/components/ui/dialog"

export type BodyGoalDropdownMenuProps = {
  goal: Goal
  date: Date
}

export function BodyGoalDropdownMenu(props: BodyGoalDropdownMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const router = useRouter()

  const date = DateTime.prettyLocalDate(
    DateTime.parseApiDateString(props.goal.date),
  )

  const onDelete = () => {
    makeRequestOrThrow(RemoveGoalsDocument, {
      ids: [props.goal.id],
    }).then(() => {
      router.refresh()
    })
  }

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-11/12">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the goal you set on {date}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowDeleteDialog(false)
                onDelete()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle>Edit Goals</DialogTitle>
          </DialogHeader>
          <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
            <BodyGoalEditorForm
              onSubmit={() => setShowEditDialog(false)}
              date={props.date}
              goal={props.goal}
            />
          </div>
          <DialogFooter>
            <p className="text-center">
              This goal was set on{" "}
              {DateTime.prettyLocalDate(
                DateTime.parseApiDateString(props.goal.date),
              )}
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
