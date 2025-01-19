"use client"

import { CreateGoalDocument, makeRequestOrThrow } from "@nutrigym/lib/client"
import { calculatePortion, caloriesToGrams } from "@nutrigym/lib/conversion"
import { FractionalPieChart } from "@nutrigym/components/charts"
import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@nutrigym/components/ui/button"
import { Slider } from "@nutrigym/components/ui/slider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nutrigym/components/ui/input"
import { useForm, useWatch } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { z } from "zod"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@nutrigym/components/ui/alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nutrigym/components/ui/form"
import {
  PageContainer,
  PageHeading,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"

const formSchema = z.object({
  waterInMilliliters: z.coerce.number().min(0),
  weightInPounds: z.coerce.number().min(0),
  sleepInHours: z.coerce.number().min(0),
  proteinPercentage: z.coerce.number().min(0),
  carbsPercentage: z.coerce.number().min(0),
  fatPercentage: z.coerce.number().min(0),
  calories: z.coerce.number().min(0),
  steps: z.coerce.number().int().min(0),
})

export function PersonalGoalsSetter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waterInMilliliters: 3000,
      weightInPounds: 150,
      sleepInHours: 8,
      proteinPercentage: 25,
      carbsPercentage: 50,
      fatPercentage: 25,
      calories: 2000,
      steps: 10000,
    },
  })

  const data = useWatch({ control: form.control })
  const stat = useMemo(() => {
    const totGrams = caloriesToGrams(data.calories ?? 0)
    const proteinPercentage = data.proteinPercentage ?? 0
    const carbsPercentage = data.carbsPercentage ?? 0
    const fatPercentage = data.fatPercentage ?? 0
    const calories = data.calories ?? 0
    return {
      percentageSum: proteinPercentage + carbsPercentage + fatPercentage,
      proteinInGrams: calculatePortion(totGrams, proteinPercentage),
      carbsInGrams: calculatePortion(totGrams, carbsPercentage),
      fatInGrams: calculatePortion(totGrams, fatPercentage),
      calories,
    }
  }, [data])

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateGoalDocument, {
      data: values,
    }).then(() => {
      router.refresh()
    })
  }

  return (
    <PageContainer>
      <PageHeading name="Onboarding" />
      <PageSubContainer>
        <PageSubHeading name="Set Your Health Goals" />
        <FractionalPieChart
          title="Macro Distribution"
          description={`Calorie Goal = ${stat.calories}`}
          slices={[
            {
              category: "protein",
              value: stat.proteinInGrams,
              label: "Protein",
              units: "(g)",
              color: "hsl(var(--chart-1))",
            },
            {
              category: "carbs",
              value: stat.carbsInGrams,
              label: "Carbs",
              units: "(g)",
              color: "hsl(var(--chart-2))",
            },
            {
              category: "fat",
              value: stat.fatInGrams,
              label: "Fats",
              units: "(g)",
              color: "hsl(var(--chart-3))",
            },
          ]}
        />
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Goals" />
          <Button onClick={() => form.reset()}>
            <RefreshCwIcon />
          </Button>
        </div>
        <div className="flex flex-col gap-y-5 rounded-lg border p-4">
          {stat.percentageSum !== 100 && (
            <Alert variant="destructive">
              <TriangleAlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Percentages must sum to 100%</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form
              className="flex flex-col gap-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="weightInPounds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="waterInMilliliters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water (ml)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sleepInHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep (hrs)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Steps</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proteinPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein ({field.value}%)</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        value={[field.value]}
                        min={0}
                        max={100}
                        step={0.5}
                        onValueChange={([val]) =>
                          form.setValue("proteinPercentage", val)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbsPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs ({field.value}%)</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        value={[field.value]}
                        min={0}
                        max={100}
                        step={0.5}
                        onValueChange={([val]) =>
                          form.setValue("carbsPercentage", val)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fatPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat ({field.value}%)</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        value={[field.value]}
                        min={0}
                        max={100}
                        step={0.5}
                        onValueChange={([val]) =>
                          form.setValue("fatPercentage", val)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Set Goals</Button>
            </form>
          </Form>
        </div>
      </PageSubContainer>
    </PageContainer>
  )
}
