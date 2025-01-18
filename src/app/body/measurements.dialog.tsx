"use client"

import { BodyMeasurementByDateQuery } from "@nutrigym/lib/client"
import { Button } from "@nutrigym/components/ui/button"
import { MeasurementsForm } from "./measurements.form"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@nutrigym/components/ui/dialog"

export type MeasurementsDialogProps = {
  log: BodyMeasurementByDateQuery["measurementsByDate"]
  date: Date
}

export function MeasurementsDialog(props: MeasurementsDialogProps) {
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
          <DialogTitle>Add Body Measurement</DialogTitle>
        </DialogHeader>
        <div className="w-full border p-5">
          <MeasurementsForm
            date={props.date}
            log={props.log}
            onSubmit={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
