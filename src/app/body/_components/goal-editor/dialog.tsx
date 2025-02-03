"use client"

import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/client/common"
import { Goal } from "@nutrigym/lib/client/graphql"
import { BodyGoalEditorForm } from "./form"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@nutrigym/components/ui/dialog"

export type BodyGoalEditorDialogProps = {
  goal: Goal
  date: Date
}

export function BodyGoalEditorDialog(props: BodyGoalEditorDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Edit Goals</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
          <BodyGoalEditorForm
            onSubmit={() => setOpen(false)}
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
  )
}
