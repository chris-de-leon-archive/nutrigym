"use client"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/client/common"
import { FoodMeasurementForm } from "./food.log.form"
import { MoreHorizontalIcon } from "lucide-react"
import { AddFoodForm } from "./food.add.form"
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
} from "@nutrigym/components/ui/dialog"
import {
  RemoveFoodMeasurementsDocument,
  FoodMeasurement,
  Food,
} from "@nutrigym/lib/client/graphql"

export type NutritionMeasurementsDropdownMenuProps = {
  measurements: FoodMeasurement[]
  foods: Food[]
  date: string
}

export function NutritionMeasurementsDropdownMenu(
  props: NutritionMeasurementsDropdownMenuProps,
) {
  const [showLogFoodDialog, setShowLogFoodDialog] = useState(false)
  const [showAddFoodDialog, setShowAddFoodDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  const onDelete = () => {
    makeRequestOrThrow(RemoveFoodMeasurementsDocument, {
      ids: props.measurements.map(({ id }) => id),
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
              This will delete all food measurements for{" "}
              {DateTime.prettyLocalDate(
                DateTime.parseApiDateString(props.date),
              )}
              . This action cannot be undone.
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
      <Dialog open={showAddFoodDialog} onOpenChange={setShowAddFoodDialog}>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle>Add New Food</DialogTitle>
          </DialogHeader>
          <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
            <AddFoodForm onSubmit={() => setShowAddFoodDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showLogFoodDialog} onOpenChange={setShowLogFoodDialog}>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle>New Measurement</DialogTitle>
          </DialogHeader>
          <div className="max-h-[75vh] w-full overflow-y-scroll border p-5">
            <FoodMeasurementForm
              onSubmit={() => setShowLogFoodDialog(false)}
              measurement={undefined}
              foods={props.foods}
              date={props.date}
            />
          </div>
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
          <DropdownMenuItem onClick={() => setShowLogFoodDialog(true)}>
            Log Food
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowAddFoodDialog(true)}>
            Add Food
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
