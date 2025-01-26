"use client"

import { PersonalInfoEditorForm } from "./editor.form"
import { Button } from "@nutrigym/components/ui/button"
import { Body } from "@nutrigym/lib/client"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@nutrigym/components/ui/dialog"

export type PersonalInfoEditorDialogProps = {
  today: Date
  body: Body
}

export function PersonalInfoEditorDialog(props: PersonalInfoEditorDialogProps) {
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
          <DialogTitle>Edit Personal Info</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
          <PersonalInfoEditorForm
            onSubmit={() => setOpen(false)}
            today={props.today}
            body={props.body}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
