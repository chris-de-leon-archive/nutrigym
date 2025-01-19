"use client"

import { BodyMeasurementByDateQuery } from "@nutrigym/lib/client"
import { Button } from "@nutrigym/components/ui/button"
import { BodyMeasurementsForm } from "./measurements.form"
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
  log: BodyMeasurementByDateQuery["measurementsByDate"]
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
            log={props.log}
            onSubmit={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
