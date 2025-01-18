"use client"

import { ExistingFoodForm } from "./food-creator.existing-food.form"
import { NewFoodForm } from "./food-creator.new-food.form"
import { Button } from "@nutrigym/components/ui/button"
import { FoodsQuery } from "@nutrigym/lib/client"
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

export type FoodCreatorDialogProps = {
  foods: FoodsQuery["foods"]
  date: Date
}

export function FoodCreatorDialog(props: FoodCreatorDialogProps) {
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
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <div>
          <Tabs
            defaultValue="existing"
            className="flex flex-col items-center justify-center"
          >
            <TabsList className="flex w-full flex-row justify-around">
              <TabsTrigger value="existing">Existing Food</TabsTrigger>
              <TabsTrigger value="new">New Food</TabsTrigger>
            </TabsList>
            <TabsContent value="existing" className="w-full border p-5">
              <ExistingFoodForm
                date={props.date}
                onSubmit={() => setOpen(false)}
                foods={props.foods}
              />
            </TabsContent>
            <TabsContent value="new" className="w-full border p-5">
              <NewFoodForm date={props.date} onSubmit={() => setOpen(false)} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
