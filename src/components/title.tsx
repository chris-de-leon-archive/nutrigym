"use client"

import { Calendar } from "@nutrigym/components/ui/calendar"
import { Button } from "@nutrigym/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

// TODO: add onSelect hook
export type TitleProps = {
  name: string
}

export function Title(props: TitleProps) {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex w-1/2 flex-col justify-start">
        <span className="text-3xl font-bold">{props.name}</span>
      </div>
      <div className="flex w-1/2 flex-row justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => (d != null ? setDate(d) : null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
