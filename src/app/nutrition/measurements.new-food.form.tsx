"use client"

import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useRouter } from "next/navigation"
import { NutritionLabels } from "./labels"
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

export type NutritionMeasurementFromNewFoodFormProps = {
  onSubmit: () => void
  date: Date
}

export function NutritionMeasurementFromNewFoodForm(
  props: NutritionMeasurementFromNewFoodFormProps,
) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

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
        <div className="flex flex-col gap-y-2">
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
            {NutritionLabels.entries()
              .toArray()
              .map(([k, label], i) => {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={k}
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
