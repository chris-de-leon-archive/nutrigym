"use client"

import { Calendar } from "@nutrigym/components/ui/calendar"
import { Button } from "@nutrigym/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@nutrigym/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export default function Training() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex w-1/2 flex-col justify-start">
          <span className="text-3xl font-bold">Training</span>
        </div>
        <div className="flex w-1/2 flex-row justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"secondary"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
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
    </div>
  )
}
