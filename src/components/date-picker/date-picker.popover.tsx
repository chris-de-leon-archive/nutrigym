"use client"

import { SearchParams } from "@nutrigym/lib/search-params"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@nutrigym/components/ui/button"
import { DateTime } from "@nutrigym/lib/datetime"
import { CalendarIcon } from "lucide-react"
import { DatePicker } from "./date-picker"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export type DatePickerPopoverProps = {
  today: Date
  date: Date
}

export function DatePickerPopover(props: DatePickerPopoverProps) {
  const [date, setDate] = useState(props.date)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const onDateChange = (date: Date) => {
    setDate(date)
    router.push(SearchParams.date.href(pathname, date))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="justify-start text-left font-normal"
        >
          <CalendarIcon />
          {DateTime.getMonthName(date)} {date.getDate()}, {date.getFullYear()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          onCalendarChange={(date) => onDateChange(date)}
          onMonthChange={(m) => onDateChange(DateTime.setMonth(date, m))}
          onYearChange={(y) => onDateChange(DateTime.setYear(date, y))}
          onDayChange={(d) => onDateChange(DateTime.setDate(date, d))}
          today={props.today}
          date={date}
        />
      </PopoverContent>
    </Popover>
  )
}
