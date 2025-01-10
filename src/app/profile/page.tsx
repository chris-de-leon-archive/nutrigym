"use client"

import { Button } from "@nutrigym/components/ui/button"
import { Input } from "@nutrigym/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Gender } from "@nutrigym/lib/enums"
import { UserButton } from "@clerk/nextjs"
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

// TODO: placeholders should show the current values for each field
// TODO: calorie target should offer "shortcuts" which auto-compute the calories based on a specific goal (e.g. lose weight, gain weight, etc.)

export default function Profile() {
  const schemas = {
    personal: z.object({
      birthday: z.string().datetime(),
      gender: z.nativeEnum(Gender),
    }),
    macros: z
      .object({
        calories: z.coerce.number().min(0),
        protein: z.coerce.number().min(0).max(100),
        carbs: z.coerce.number().min(0).max(100),
        fat: z.coerce.number().min(0).max(100),
      })
      .superRefine((arg, ctx) => {
        // TODO: pop up error
        const tot = arg.protein + arg.carbs + arg.fat
        if (tot != 100) {
          ctx.addIssue({
            message: `Percentages must add up to 100% (got ${tot}%)`,
            code: z.ZodIssueCode.custom,
            fatal: true,
          })
          return z.NEVER
        }
      }),
  }

  const forms = {
    personal: {
      form: useForm<z.infer<typeof schemas.personal>>({
        resolver: zodResolver(schemas.personal),
      }),
      onSubmit: (values: z.infer<typeof schemas.personal>) => {
        console.log(values)
      },
    },
    macros: {
      form: useForm<z.infer<typeof schemas.macros>>({
        resolver: zodResolver(schemas.macros),
      }),
      onSubmit: (values: z.infer<typeof schemas.macros>) => {
        console.log(values)
      },
    },
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-5">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-3xl font-bold">Profile</span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[50px] h-[50px]",
              },
            }}
          />
        </div>
        <div className="flex flex-col justify-start gap-y-5 rounded border p-5">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Personal</span>
          </div>
          <Form {...forms.personal.form}>
            <form
              onSubmit={forms.personal.form.handleSubmit(
                forms.personal.onSubmit,
              )}
              className="space-y-8"
            >
              <FormField
                control={forms.personal.form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={forms.personal.form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col justify-start gap-y-5 rounded border p-5">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Macro Goals</span>
          </div>
          <Form {...forms.macros.form}>
            <form
              onSubmit={forms.macros.form.handleSubmit(forms.macros.onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={forms.macros.form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorie Target</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={forms.macros.form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein %</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={forms.macros.form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs %</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={forms.macros.form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat %</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Set Goals</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
