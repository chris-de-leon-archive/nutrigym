"use client"

import { NutritionMeasurementFromExistingFoodForm } from "./existing-food.form"
import { NutritionMeasurementFromNewFoodForm } from "./new-food.form"
import { Button } from "@nutrigym/components/ui/button"
import { Food } from "@nutrigym/lib/client/graphql"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@nutrigym/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsTrigger,
  TabsList,
} from "@nutrigym/components/ui/tabs"

export type NutritionMeasurementsDialogProps = {
  foods: Food[]
  date: Date
}

export function NutritionMeasurementsDialog(
  props: NutritionMeasurementsDialogProps,
) {
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
          <DialogTitle>Add Food Measurement</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="existing"
          className="flex flex-col items-center justify-center"
        >
          <TabsList className="flex w-full flex-row justify-around">
            <TabsTrigger value="existing">Existing Food</TabsTrigger>
            <TabsTrigger value="new">New Food</TabsTrigger>
          </TabsList>
          <TabsContent
            value="existing"
            className="max-h-[75vh] min-h-[75vh] w-full overflow-y-scroll border p-5"
          >
            <NutritionMeasurementFromExistingFoodForm
              date={props.date}
              onSubmit={() => setOpen(false)}
              foods={props.foods}
            />
          </TabsContent>
          <TabsContent
            value="new"
            className="max-h-[75vh] min-h-[75vh] w-full overflow-y-scroll border p-5"
          >
            <NutritionMeasurementFromNewFoodForm
              date={props.date}
              onSubmit={() => setOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
