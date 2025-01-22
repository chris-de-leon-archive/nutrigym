"use client"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { DateTime } from "@nutrigym/lib/datetime"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BodyLabels } from "./labels"
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
  CreateBodyMeasurementDocument,
  UpdateBodyMeasurementDocument,
  BodyMeasurement,
} from "@nutrigym/lib/client"

// TODO: allow null to be sent as a value to the API
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
  measurement: BodyMeasurement | null | undefined
  onSubmit: () => void
  date: Date
}

export function BodyMeasurementsForm(props: BodyMeasurementsFormProps) {
  const bodyMeasurement = props.measurement

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steps: bodyMeasurement?.steps ?? 0,
      weightInPounds: bodyMeasurement?.weightInPounds ?? 0,
      heightInInches: bodyMeasurement?.heightInInches ?? 0,
      waterInMilliliters: bodyMeasurement?.waterInMilliliters ?? 0,
      sleepInHours: bodyMeasurement?.sleepInHours ?? 0,
      waistInInches: bodyMeasurement?.waistInInches ?? 0,
      hipsInInches: bodyMeasurement?.hipsInInches ?? 0,
      chestInInches: bodyMeasurement?.chestInInches ?? 0,
      armsInInches: bodyMeasurement?.armsInInches ?? 0,
      thighsInInches: bodyMeasurement?.thighsInInches ?? 0,
      shouldersInInches: bodyMeasurement?.shouldersInInches ?? 0,
      forearmsInInches: bodyMeasurement?.forearmsInInches ?? 0,
      calvesInInches: bodyMeasurement?.calvesInInches ?? 0,
      neckInInches: bodyMeasurement?.neckInInches ?? 0,
    },
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (props.measurement == null) {
      makeRequestOrThrow(CreateBodyMeasurementDocument, {
        date: DateTime.formatDate(props.date),
        data: values,
      }).then(() => {
        router.refresh()
        props.onSubmit()
      })
    } else {
      makeRequestOrThrow(UpdateBodyMeasurementDocument, {
        id: props.measurement.id,
        date: DateTime.formatDate(props.date),
        data: values,
      }).then(() => {
        router.refresh()
        props.onSubmit()
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <div className="grid grid-cols-2 gap-2">
          {Array.from(BodyLabels.entries()).map(([k, label], i) => {
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
