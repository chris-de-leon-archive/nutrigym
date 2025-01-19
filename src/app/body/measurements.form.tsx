"use client"

import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { stripNull } from "@nutrigym/lib/utils"
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
  BodyMeasurementByDateQuery,
  makeRequestOrThrow,
  UpsertBodyMeasurementDocument,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  steps: z.coerce.number().min(0),
  weightInPounds: z.coerce.number().min(0),
  heightInInches: z.coerce.number().min(0),
  waterInMilliliters: z.coerce.number().min(0).optional(),
  sleepInHours: z.coerce.number().min(0).optional(),
  waistInInches: z.coerce.number().min(0).optional(),
  hipsInInches: z.coerce.number().min(0).optional(),
  chestInInches: z.coerce.number().min(0).optional(),
  armsInInches: z.coerce.number().min(0).optional(),
  thighsInInches: z.coerce.number().min(0).optional(),
  shouldersInInches: z.coerce.number().min(0).optional(),
  forearmsInInches: z.coerce.number().min(0).optional(),
  calvesInInches: z.coerce.number().min(0).optional(),
  neckInInches: z.coerce.number().min(0).optional(),
})

export type BodyMeasurementsFormProps = {
  log: BodyMeasurementByDateQuery["measurementsByDate"]
  onSubmit: () => void
  date: Date
}

export function BodyMeasurementsForm(props: BodyMeasurementsFormProps) {
  const bodyMeasurement = props.log?.bodyMeasurement

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steps: stripNull(bodyMeasurement?.steps),
      weightInPounds: stripNull(bodyMeasurement?.weightInPounds),
      heightInInches: stripNull(bodyMeasurement?.heightInInches),
      waterInMilliliters: stripNull(bodyMeasurement?.waterInMilliliters),
      sleepInHours: stripNull(bodyMeasurement?.sleepInHours),
      waistInInches: stripNull(bodyMeasurement?.waistInInches),
      hipsInInches: stripNull(bodyMeasurement?.hipsInInches),
      chestInInches: stripNull(bodyMeasurement?.chestInInches),
      armsInInches: stripNull(bodyMeasurement?.armsInInches),
      thighsInInches: stripNull(bodyMeasurement?.thighsInInches),
      shouldersInInches: stripNull(bodyMeasurement?.shouldersInInches),
      forearmsInInches: stripNull(bodyMeasurement?.forearmsInInches),
      calvesInInches: stripNull(bodyMeasurement?.calvesInInches),
      neckInInches: stripNull(bodyMeasurement?.neckInInches),
    },
  })

  // TODO: labels are duplicated
  const labels: Record<keyof z.infer<typeof formSchema>, string> = {
    steps: "Steps",
    weightInPounds: "Weight (lbs)",
    heightInInches: "Height (inches)",
    waterInMilliliters: "Water (ml)",
    sleepInHours: "Sleep (hours)",
    waistInInches: "Waist (inches)",
    hipsInInches: "Hips (inches)",
    chestInInches: "Chest (inches)",
    armsInInches: "Arms (inches)",
    thighsInInches: "Thighs (inches)",
    shouldersInInches: "Shoulders (inches)",
    forearmsInInches: "Forearms (inches)",
    calvesInInches: "Calves (inches)",
    neckInInches: "Neck (inches)",
  }

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(UpsertBodyMeasurementDocument, {
      date: props.date,
      data: values,
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
