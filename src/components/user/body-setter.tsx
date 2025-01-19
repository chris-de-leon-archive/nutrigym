"use client"

import {
  PageContainer,
  PageHeading,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"
import { setMonth, setYear, setDay } from "@nutrigym/lib/datetime"
import { DatePicker } from "@nutrigym/components/date-picker"
import { Button } from "@nutrigym/components/ui/button"
import { redirect, usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
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
    <PageContainer>
      <PageHeading name="Onboarding" />
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
                  <DatePicker
                    onCalendarChange={(date) => form.setValue("birthday", date)}
                    onMonthChange={(m) =>
                      form.setValue("birthday", setMonth(field.value, m))
                    }
                    onYearChange={(y) =>
                      form.setValue("birthday", setYear(field.value, y))
                    }
                    onDayChange={(d) =>
                      form.setValue("birthday", setDay(field.value, d))
                    }
                    date={field.value}
                    today={today}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </PageContainer>
  )
}
