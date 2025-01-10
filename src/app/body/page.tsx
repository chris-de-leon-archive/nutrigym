"use client"

import { GoalPieChart } from "@nutrigym/components/charts/goal.pie-chart"
import { CalendarIcon, EditIcon, PlusIcon } from "lucide-react"
import { Calendar } from "@nutrigym/components/ui/calendar"
import { Button } from "@nutrigym/components/ui/button"
import { cn } from "@nutrigym/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export default function Body() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-1/2 flex-col justify-start">
            <span className="text-3xl font-bold">Body</span>
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
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Goals</span>
            <EditIcon />
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg border p-2">
            <GoalPieChart title="Weight (lbs)" goal={1000} curr={500} />
            <GoalPieChart title="Water (ml)" goal={1000} curr={750} />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Measurements</span>
            <PlusIcon />
          </div>
          <div className="rounded-lg border p-2">
            <div className="flex justify-center">
              <p>No measurements to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
