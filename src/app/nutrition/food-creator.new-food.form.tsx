"use client"

import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
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
  CreateFoodMeasurementFromFoodDetailsDocument,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  servingsConsumed: z.coerce.number().min(0),
  name: z.string().min(1),
  brand: z.string().min(1),
  calories: z.coerce.number().min(0),
  servingSize: z.coerce.number().min(0),
  servingUnit: z.string().min(1),
  totalProteinInGrams: z.coerce.number().min(0).optional(),
  totalCarbsInGrams: z.coerce.number().min(0).optional(),
  totalFatInGrams: z.coerce.number().min(0).optional(),
  polyunsaturatedFatInGrams: z.coerce.number().min(0).optional(),
  monounsaturatedFatInGrams: z.coerce.number().min(0).optional(),
  saturatedFatInGrams: z.coerce.number().min(0).optional(),
  potassiumInMilligrams: z.coerce.number().min(0).optional(),
  sodiumInMilligrams: z.coerce.number().min(0).optional(),
  dietaryFiberInGrams: z.coerce.number().min(0).optional(),
  sugarsInGrams: z.coerce.number().min(0).optional(),
  cholesterolInMilligrams: z.coerce.number().min(0).optional(),
  calciumInMilligrams: z.coerce.number().min(0).optional(),
  ironInMilligrams: z.coerce.number().min(0).optional(),
})

export type NewFoodFormProps = {
  onSubmit: () => void
  date: Date
}

export function NewFoodForm(props: NewFoodFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // TODO: this object is duplicated
  const labels: Record<
    keyof Omit<z.infer<typeof formSchema>, "servingsConsumed">,
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
    const { servingsConsumed, ...food } = values
    makeRequestOrThrow(CreateFoodMeasurementFromFoodDetailsDocument, {
      date: props.date,
      data: {
        servingsConsumed,
        food,
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
        <div className="flex max-h-[50vh] flex-col gap-y-2 overflow-y-scroll">
          <FormField
            control={form.control}
            name="servingsConsumed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings Consumed</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(labels).map(([k, label], i) => {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={k as keyof typeof labels}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
