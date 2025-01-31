"use client"

import { NutritionLabels, NutritionLabelsKeys } from "../../_lib"
import { Card, CardContent } from "@nutrigym/components/ui/card"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Combobox } from "@nutrigym/components/combobox"
import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/client/common"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useForm, useWatch } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nutrigym/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nutrigym/components/ui/table"
import {
  CreateFoodMeasurementFromFoodIdDocument,
  Food,
} from "@nutrigym/lib/client/graphql"

const formSchema = z.object({
  servingsConsumed: z.coerce.number().min(0),
  foodId: z.string().uuid(),
})

export type NutritionMeasurementFromExistingFoodFormProps = {
  onSubmit: () => void
  foods: Food[]
  date: Date
}

export function NutritionMeasurementFromExistingFoodForm(
  props: NutritionMeasurementFromExistingFoodFormProps,
) {
  const [selectedFood, setSelectedFood] = useState<
    Record<NutritionLabelsKeys, string | number> | undefined
  >(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servingsConsumed: 1,
      foodId: "",
    },
  })

  const values = useWatch({ control: form.control })
  useEffect(() => {
    const id = values.foodId
    if (id == null) {
      setSelectedFood(undefined)
      return
    }

    const food = props.foods.find((f) => f.id === id)
    if (food == null) {
      setSelectedFood(undefined)
      return
    }

    setSelectedFood({
      name: food.name,
      brand: food.brand,
      servingSize: food.servingSize,
      servingUnit: food.servingUnit,
      calories: food.calories,
      totalProteinInGrams: food.totalProteinInGrams ?? 0,
      totalCarbsInGrams: food.totalCarbsInGrams ?? 0,
      totalFatInGrams: food.totalFatInGrams ?? 0,
      polyunsaturatedFatInGrams: food.polyunsaturatedFatInGrams ?? 0,
      monounsaturatedFatInGrams: food.monounsaturatedFatInGrams ?? 0,
      saturatedFatInGrams: food.saturatedFatInGrams ?? 0,
      potassiumInMilligrams: food.potassiumInMilligrams ?? 0,
      sodiumInMilligrams: food.sodiumInMilligrams ?? 0,
      dietaryFiberInGrams: food.dietaryFiberInGrams ?? 0,
      sugarsInGrams: food.sugarsInGrams ?? 0,
      cholesterolInMilligrams: food.cholesterolInMilligrams ?? 0,
      calciumInMilligrams: food.calciumInMilligrams ?? 0,
      ironInMilligrams: food.ironInMilligrams ?? 0,
    })
  }, [props.foods, values])

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateFoodMeasurementFromFoodIdDocument, {
      date: DateTime.asApiDateString(props.date),
      data: {
        servingsConsumed: values.servingsConsumed,
        food: { id: values.foodId },
      },
    }).then(() => {
      router.refresh()
      props.onSubmit()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="servingsConsumed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servings Consumed</FormLabel>
              <FormControl>
                <Input placeholder="Servings Consumed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foodId"
          render={() => (
            <FormItem>
              <FormLabel>Food</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Select a food"
                  choices={props.foods.map((f) => ({
                    // TODO: if the label is too long, then the modal gets messed up:
                    // label: `${f.name}, ${f.brand} (${f.calories} cals/serving)`,
                    value: f.id,
                    label: f.name,
                  }))}
                  onSelect={(v) => {
                    if (v == null) {
                      setSelectedFood(undefined)
                      form.resetField("foodId")
                    } else {
                      form.setValue("foodId", v)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-medium">Nutrition Facts</span>
          <Card>
            <CardContent className="p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(NutritionLabels.entries()).map(([k, label]) => (
                    <TableRow key={k}>
                      <TableCell className="font-medium">{label}</TableCell>
                      <TableCell className="text-center">
                        {selectedFood == null ? undefined : selectedFood[k]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
