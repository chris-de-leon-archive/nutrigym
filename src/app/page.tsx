"use client"

import { NutritionChart } from "@nutrigym/components/charts/nutrition.chart"
import { WeightChart } from "@nutrigym/components/charts/weight.chart"
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs"
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

// TODO:

export default function Home() {
  const [date, setDate] = useState<Date>(new Date())

  const weights = Array.from({ length: 100 })
    .map((_, i) => {
      return {
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        weight: Math.random() * 1000,
      }
    })
    .reverse()

  return (
    <div className="container mx-auto">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col justify-start gap-y-5">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex w-1/2 flex-col justify-start">
              <span className="text-3xl font-bold">Home</span>
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

          {/* Graphs */}
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-bold">Nutrition</span>
            <NutritionChart />
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-bold">Body</span>
            <WeightChart title="Weight" data={weights} />
          </div>
        </div>
      </SignedIn>
    </div>
  )
}
