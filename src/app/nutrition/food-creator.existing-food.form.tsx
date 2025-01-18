"use client"

import { Combobox } from "@nutrigym/components/combobox"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useForm, useWatch } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
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
  FoodsQuery,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  servingsConsumed: z.coerce.number().min(0),
  foodId: z.string().uuid(),
})

export type ExistingFoodFormProps = {
  onSubmit: () => void
  foods: FoodsQuery["foods"]
  date: Date
}

export function ExistingFoodForm(props: ExistingFoodFormProps) {
  const [selectedFood, setSelectedFood] = useState<
    (typeof props.foods)[number] | undefined
  >(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servingsConsumed: 1,
    },
  })

  const values = useWatch({
    control: form.control,
  })

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

    setSelectedFood(food)
  }, [props.foods, values])

  // TODO: this object is duplicated
  const labels: Record<
    keyof Omit<NonNullable<typeof selectedFood>, "id" | "__typename">,
    string
  > = {
    name: "Name",
    brand: "Brand",
    servingSize: "Serving Size",
    servingUnit: "Serving Unit",
    calories: "Calories",
    totalProteinInGrams: "Protein (g)",
    totalCarbsInGrams: "Carbs (g)",
    totalFatInGrams: "Fat (g)",
    polyunsaturatedFatInGrams: "Poly. Fat (g)",
    monounsaturatedFatInGrams: "Mono. Fat (g)",
    saturatedFatInGrams: "Sat. Fat (g)",
    potassiumInMilligrams: "Potassium (mg)",
    sodiumInMilligrams: "Sodium (mg)",
    dietaryFiberInGrams: "Fiber (g)",
    sugarsInGrams: "Sugars (g)",
    cholesterolInMilligrams: "Cholesterol (mg)",
    calciumInMilligrams: "Calcium (mg)",
    ironInMilligrams: "Iron (mg)",
  }

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateFoodMeasurementFromFoodIdDocument, {
      date: props.date,
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
                    value: f.id,
                    label: `${f.name}, ${f.brand} (${f.calories} cals/serving)`,
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
          <div className="max-h-[50vh] overflow-y-scroll rounded border p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(labels).map(([k, label]) => (
                  <TableRow key={k}>
                    <TableCell className="font-medium">{label}</TableCell>
                    <TableCell>
                      {(selectedFood ?? {})[k as keyof typeof labels]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
