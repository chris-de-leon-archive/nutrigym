"use client"

import { Button } from "@nutrigym/components/ui/button"
import { NutritionGoalEditorForm } from "./form"
import { Goal } from "@nutrigym/lib/client"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@nutrigym/components/ui/dialog"

export type NutritionGoalEditorDialogProps = {
  goal: Goal
  date: Date
}

export function NutritionGoalEditorDialog(
  props: NutritionGoalEditorDialogProps,
) {
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
          <NutritionGoalEditorForm
            onSubmit={() => setOpen(false)}
            date={props.date}
            goal={props.goal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
