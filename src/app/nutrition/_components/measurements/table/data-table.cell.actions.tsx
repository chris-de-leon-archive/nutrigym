"use client"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { FoodMeasurementForm } from "../food.log.form"
import { MoreVerticalIcon } from "lucide-react"
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
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@nutrigym/components/ui/dialog"
import {
  RemoveFoodMeasurementsDocument,
  FoodMeasurement,
  Food,
} from "@nutrigym/lib/client/graphql"

export type NutritionMeasurementCellActionsProps = {
  measurement: FoodMeasurement
  foods: Food[]
  date: string
}

export function NutritionMeasurementCellActions({
  measurement: m,
  foods: f,
  date: d,
}: NutritionMeasurementCellActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const router = useRouter()

  const onDelete = () => {
    makeRequestOrThrow(RemoveFoodMeasurementsDocument, {
      date: d,
      ids: [m.id],
    }).then(() => {
      router.refresh()
    })
  }

  return (
    <>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle>Edit Measurement</DialogTitle>
          </DialogHeader>
          <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
            <FoodMeasurementForm
              onSubmit={() => setShowEditDialog(false)}
              measurement={m}
              foods={f}
              date={d}
            />
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVerticalIcon className="h-2 w-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
