"use client"

import { DatePicker } from "@nutrigym/components/date-picker"
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
} from "@nutrigym/components/ui/form"
import {
  Body,
  makeRequestOrThrow,
  UpdateBodyDocument,
  Gender,
} from "@nutrigym/lib/client"

const formSchema = z.object({
  birthday: z.date(),
  gender: z.nativeEnum(Gender),
})

export type PersonalInfoEditorFormProps = {
  onSubmit: () => void
  body: Body
}

export function PersonalInfoEditorForm(props: PersonalInfoEditorFormProps) {
  const today = new Date()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: new Date(props.body.birthday),
      gender: props.body.gender,
    },
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    makeRequestOrThrow(UpdateBodyDocument, {
      id: props.body.id,
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
              <FormControl>
                <DatePicker
                  onCalendarChange={(date) => form.setValue("birthday", date)}
                  onMonthChange={(m) =>
                    form.setValue("birthday", DateTime.setMonth(field.value, m))
                  }
                  onYearChange={(y) =>
                    form.setValue("birthday", DateTime.setYear(field.value, y))
                  }
                  onDayChange={(d) =>
                    form.setValue("birthday", DateTime.setDate(field.value, d))
                  }
                  date={field.value}
                  today={today}
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
