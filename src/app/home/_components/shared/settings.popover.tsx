"use client"

import { SettingsFormProps, createSettingsForm } from "./settings.form"
import { Button } from "@nutrigym/components/ui/button"
import { SlidersHorizontalIcon } from "lucide-react"
import { useState } from "react"
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@nutrigym/components/ui/popover"

export type SettingsPopoverProps<
  T extends Record<string, string>,
  K extends keyof T,
> = SettingsFormProps<T, K>

export function SettingsPopover<
  T extends Record<string, string>,
  K extends keyof T,
>(props: SettingsPopoverProps<T, K>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  // HACK: the SettingsForm component needs to be wrapped in a function so that
  // the generic types work properly. If we do not do this, then we will receive
  // an error similar to: 'string' is not assignable to type 'T[keyof T]'. See
  // link here for more details: https://stackoverflow.com/a/72022538
  const SettingsForm = createSettingsForm<T, K>()

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-fit">
        <SettingsForm
          {...{
            ...props,
            onSubmit: (dataset) => {
              setIsPopoverOpen(false)
              props.onSubmit(dataset)
            },
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
