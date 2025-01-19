"use client"

import { setDay, setMonth, setYear } from "@nutrigym/lib/datetime"
import { Button } from "@nutrigym/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { DatePicker } from "./date-picker"
import { format } from "date-fns"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export function DatePickerPopover() {
  const today = new Date()

  const [date, setDate] = useState<Date>(today)

  return (
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
  )
}
