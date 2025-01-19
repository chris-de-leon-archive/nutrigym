"use client"

import { setDay, setMonth, setYear } from "@nutrigym/lib/datetime"
import { DatePicker } from "@nutrigym/components/date-picker"
import { Button } from "@nutrigym/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { PageHeading } from "./heading"
import { format } from "date-fns"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

// TODO: add onSelect hook
export type PageHeadingWithDatePickerProps = {
  name: string
}

export function PageHeadingWithDatePicker(
  props: PageHeadingWithDatePickerProps,
) {
  const today = new Date()

  const [date, setDate] = useState<Date>(today)

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex w-1/2 flex-col justify-start">
        <PageHeading name={props.name} />
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
            <DatePicker
              onCalendarChange={(date) => setDate(date)}
              onMonthChange={(m) => setDate(setMonth(date, m))}
              onYearChange={(y) => setDate(setYear(date, y))}
              onDayChange={(d) => setDate(setDay(date, d))}
              date={date}
              today={today}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
