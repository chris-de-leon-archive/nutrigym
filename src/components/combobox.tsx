"use client"

import { Button } from "@nutrigym/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@nutrigym/lib/utils"
import { useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@nutrigym/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export type ComboboxProps = {
  placeholder: string
  onSelect: (v: string | undefined) => void
  choices: {
    value: string
    label: string
  }[]
}

export function Combobox(props: ComboboxProps) {
  const [label, setLabel] = useState<string | undefined>(undefined)
  const [value, setValue] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {label ?? props.placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No matches found.</CommandEmpty>
            <CommandGroup>
              {props.choices.map((c) => (
                <CommandItem
                  key={c.label}
                  value={c.label}
                  onSelect={(selectedLabel) => {
                    const selectedValue = props.choices.find(
                      (c) => c.label === selectedLabel,
                    )?.value

                    if (selectedValue === value && selectedLabel === label) {
                      setValue(undefined)
                      setLabel(undefined)
                      props.onSelect(undefined)
                    } else {
                      setValue(selectedValue)
                      setLabel(selectedLabel)
                      props.onSelect(selectedValue)
                    }

                    setOpen(false)
                  }}
                >
                  {c.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === c.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
