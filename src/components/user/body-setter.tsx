"use client"

import { Calendar } from "@nutrigym/components/ui/calendar"
import { Combobox } from "@nutrigym/components/combobox"
import { Button } from "@nutrigym/components/ui/button"
import { redirect, usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Title } from "@nutrigym/components/title"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nutrigym/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@nutrigym/components/ui/form"
import {
  MAX_MONTHS_IN_A_YEAR,
  MAX_LOOKBACK_YEARS,
  getMonthName,
  daysInMonth,
  setMonth,
  setYear,
  setDay,
} from "@nutrigym/lib/datetime"
import {
  CreateBodyDocument,
  makeRequestOrThrow,
  Gender,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  birthday: z.date(),
  gender: z.nativeEnum(Gender),
})

export function BodySetter() {
  const today = new Date()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: today,
      gender: Gender.Male,
    },
  })

  const pathname = usePathname()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(CreateBodyDocument, {
      data: values,
    }).then(() => {
      redirect(pathname)
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <Title name="Onboarding" />
        <div className="flex flex-col justify-start gap-y-5">
          <span className="text-2xl font-bold">Tell us a little about you</span>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Gender.Male}>Male</SelectItem>
                        <SelectItem value={Gender.Female}>Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <div className="flex w-full flex-row justify-around">
                          <Combobox
                            placeholder={getMonthName(field.value)}
                            choices={Array.from({
                              length: MAX_MONTHS_IN_A_YEAR,
                            }).map((_, i) => ({
                              value: i.toString(),
                              label: getMonthName(setMonth(field.value, i)),
                            }))}
                            onSelect={(v) =>
                              v != null &&
                              form.setValue(
                                "birthday",
                                setMonth(field.value, Number(v)),
                              )
                            }
                          />
                          <Combobox
                            placeholder={field.value.getDate().toString()}
                            choices={Array.from({
                              length: daysInMonth(field.value),
                            }).map((_, i) => ({
                              value: (i + 1).toString(),
                              label: (i + 1).toString(),
                            }))}
                            onSelect={(v) =>
                              v != null &&
                              form.setValue(
                                "birthday",
                                setDay(field.value, Number(v)),
                              )
                            }
                          />
                          <Combobox
                            placeholder={field.value.getFullYear().toString()}
                            choices={Array.from({
                              length: MAX_LOOKBACK_YEARS,
                            }).map((_, i) => ({
                              value: (today.getFullYear() - i).toString(),
                              label: (today.getFullYear() - i).toString(),
                            }))}
                            onSelect={(v) =>
                              v != null &&
                              form.setValue(
                                "birthday",
                                setYear(field.value, Number(v)),
                              )
                            }
                          />
                        </div>
                        <Calendar
                          className="flex items-center justify-center rounded-md border"
                          mode="single"
                          required
                          fromYear={today.getFullYear() - MAX_LOOKBACK_YEARS}
                          toYear={today.getFullYear()}
                          toMonth={today}
                          toDate={today}
                          month={field.value}
                          onMonthChange={(v) => form.setValue("birthday", v)}
                          selected={field.value}
                          onSelect={(v) =>
                            v != null && form.setValue("birthday", v)
                          }
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
