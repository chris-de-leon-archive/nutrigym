"use client"

import { Calendar } from "@nutrigym/components/ui/calendar"
import { Combobox } from "@nutrigym/components/combobox"
import {
  MAX_MONTHS_IN_A_YEAR,
  MAX_LOOKBACK_YEARS,
  DateTime,
} from "@nutrigym/lib/datetime"

export type DatePickerProps = {
  onCalendarChange: (d: Date) => void
  onMonthChange: (m: number) => void
  onYearChange: (y: number) => void
  onDayChange: (d: number) => void
  today: Date
  date: Date
}

export function DatePicker(props: DatePickerProps) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row justify-around">
        <Combobox
          placeholder={DateTime.getLocalMonthName(props.date)}
          choices={Array.from({
            length: MAX_MONTHS_IN_A_YEAR,
          }).map((_, i) => ({
            value: i.toString(),
            label: DateTime.getLocalMonthName(
              DateTime.setLocalMonth(props.date, i),
            ),
          }))}
          onSelect={(v) => v != null && props.onMonthChange(Number(v))}
        />
        <Combobox
          placeholder={props.date.getDate().toString()}
          choices={Array.from({
            length: DateTime.daysInLocalMonth(props.date),
          }).map((_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
          }))}
          onSelect={(v) => v != null && props.onDayChange(Number(v))}
        />
        <Combobox
          placeholder={props.date.getFullYear().toString()}
          choices={Array.from({
            length: MAX_LOOKBACK_YEARS,
          }).map((_, i) => ({
            value: (props.today.getFullYear() - i).toString(),
            label: (props.today.getFullYear() - i).toString(),
          }))}
          onSelect={(v) => v != null && props.onYearChange(Number(v))}
        />
      </div>
      <Calendar
        className="flex items-center justify-center rounded-md border"
        mode="single"
        required
        fromYear={props.today.getFullYear() - MAX_LOOKBACK_YEARS}
        toYear={props.today.getFullYear()}
        toMonth={props.today}
        toDate={props.today}
        month={props.date}
        onMonthChange={(v) => props.onCalendarChange(v)}
        selected={props.date}
        onSelect={(v) => v != null && props.onCalendarChange(v)}
      />
    </div>
  )
}
