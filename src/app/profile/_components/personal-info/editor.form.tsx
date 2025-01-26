"use client"

import { UpdateBodyDocument, Gender, Body } from "@nutrigym/lib/client"
import { DatePicker } from "@nutrigym/components/date-picker"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateTime } from "@nutrigym/lib/datetime"
import { useRouter } from "next/navigation"
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
  FormMessage,
} from "@nutrigym/components/ui/form"

export type PersonalInfoEditorFormProps = {
  onSubmit: () => void
  today: Date
  body: Body
}

export function PersonalInfoEditorForm(props: PersonalInfoEditorFormProps) {
  const formSchema = z.object({
    birthday: z.date().max(props.today),
    gender: z.nativeEnum(Gender),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: DateTime.parseApiDateString(props.body.birthday),
      gender: props.body.gender,
    },
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(UpdateBodyDocument, {
      id: props.body.id,
      data: {
        birthday: DateTime.asApiDateString(values.birthday),
        gender: values.gender,
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
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
              <FormMessage />
              <FormControl>
                <DatePicker
                  onCalendarChange={(date) => form.setValue("birthday", date)}
                  onMonthChange={(m) =>
                    form.setValue(
                      "birthday",
                      DateTime.setLocalMonth(field.value, m),
                    )
                  }
                  onYearChange={(y) =>
                    form.setValue(
                      "birthday",
                      DateTime.setLocalYear(field.value, y),
                    )
                  }
                  onDayChange={(d) =>
                    form.setValue(
                      "birthday",
                      DateTime.setLocalDate(field.value, d),
                    )
                  }
                  today={props.today}
                  date={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
