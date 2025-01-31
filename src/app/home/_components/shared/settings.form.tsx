"use client"

import { Switch } from "@nutrigym/components/ui/switch"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@nutrigym/components/ui/select"
import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  Form,
} from "@nutrigym/components/ui/form"
import {
  RequiredTimeRangeValues,
  OptionalTimeRangeValues,
  RequiredTimeRangeType,
  OptionalTimeRangeType,
  LineStyle,
  Dataset,
} from "../../_lib"

const getFormSchema = <T extends Record<string, string>>(titles: T) => {
  return z.object({
    // HACK: there's a strange type inference issue that occurs when mixing generics with zod
    // enums. To fix this, we will cast the enum value to a generic string to make the typing
    // work in this component. Then, we will cast it back to the specific enum value when we
    // use the onSubmit callback that way the caller still gets full type safety
    title: z.nativeEnum(titles) as z.ZodType<string, z.ZodTypeDef, string>,
    window: z.enum(OptionalTimeRangeValues),
    range: z.enum(RequiredTimeRangeValues),
    displayLegend: z.boolean(),
    displayDots: z.boolean(),
    lineStyle: z.nativeEnum(LineStyle),
  })
}

type FormSchema<T extends Record<string, string>, K extends keyof T> = Omit<
  z.infer<ReturnType<typeof getFormSchema<T>>>,
  "title"
> & { title: T[K] }

export type SettingsFormProps<
  T extends Record<string, string>,
  K extends keyof T,
> = {
  onSubmit: (values: FormSchema<T, K>) => void
  dataset: Dataset<T[K]>
  titles: T
}

export function createSettingsForm<
  T extends Record<string, string>,
  K extends keyof T,
>() {
  return function SettingsForm(props: SettingsFormProps<T, K>) {
    const formSchema = getFormSchema(props.titles)
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        displayLegend: props.dataset.style.legend,
        displayDots: props.dataset.style.dots,
        lineStyle: props.dataset.style.line,
        window: props.dataset.window,
        range: props.dataset.range,
        title: props.dataset.title,
      },
    })

    return (
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit((values) =>
            props.onSubmit({
              ...values,
              title: values.title as T[K],
            }),
          )}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Range</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v: RequiredTimeRangeType) =>
                        form.setValue("range", v)
                      }
                    >
                      <SelectTrigger
                        className="rounded-lg"
                        aria-label="Select a value"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {RequiredTimeRangeValues.map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={v}
                              className="rounded-lg"
                            >
                              {v}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chart</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v) => form.setValue("title", v)}
                    >
                      <SelectTrigger
                        className="rounded-lg"
                        aria-label="Select a value"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Object.values(props.titles).map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={v}
                              className="rounded-lg"
                            >
                              {v}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="window"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rolling Avg.</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v: OptionalTimeRangeType) =>
                        form.setValue("window", v)
                      }
                    >
                      <SelectTrigger
                        className="rounded-lg"
                        aria-label="Select a value"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {OptionalTimeRangeValues.map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={v}
                              className="rounded-lg"
                            >
                              {v}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lineStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line Style</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v: LineStyle) =>
                        form.setValue("lineStyle", v)
                      }
                    >
                      <SelectTrigger
                        className="rounded-lg"
                        aria-label="Select a value"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Object.values(LineStyle).map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={v}
                              className="rounded-lg"
                            >
                              {v}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayDots"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Display Dots</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayLegend"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Display Legend</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            Update
          </Button>
        </form>
      </Form>
    )
  }
}
