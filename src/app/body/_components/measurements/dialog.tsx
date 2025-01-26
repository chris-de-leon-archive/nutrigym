"use client"

import { BodyMeasurementsForm } from "./form"
import { Button } from "@nutrigym/components/ui/button"
import { BodyMeasurement } from "@nutrigym/lib/client"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@nutrigym/components/ui/dialog"

export type BodyMeasurementsDialogProps = {
  measurement: BodyMeasurement | null | undefined
  date: Date
}

export function BodyMeasurementsDialog(props: BodyMeasurementsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Add Body Measurement</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
          <BodyMeasurementsForm
            date={props.date}
            measurement={props.measurement}
            onSubmit={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
