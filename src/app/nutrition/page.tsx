"use client"

import { GoalPieChart } from "@nutrigym/components/charts/goal.pie-chart"
import { CalendarIcon, EditIcon, PlusIcon } from "lucide-react"
import { Calendar } from "@nutrigym/components/ui/calendar"
import { Button } from "@nutrigym/components/ui/button"
import { cn } from "@nutrigym/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nutrigym/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nutrigym/components/ui/popover"

export default function Nutrition() {
  const [date, setDate] = useState<Date>(new Date())

  // TODO: fetch from API using tanstack query
  const foods = Array.from({ length: 10 }).map((_, i) => {
    return {
      name: `f${i}`,
      createdAt: new Date(Date.now() + i * 60000),
      calories: Math.random() * 1000,
      carbs: Math.random() * 1000,
      fat: Math.random() * 1000,
      protein: Math.random() * 1000,
    }
  })

  const cals = parseInt(
    foods.reduce((prev, curr) => prev + curr.calories, 0).toFixed(0),
    10,
  )

  const fats = parseInt(
    foods.reduce((prev, curr) => prev + curr.fat, 0).toFixed(0),
    10,
  )

  const carbs = parseInt(
    foods.reduce((prev, curr) => prev + curr.carbs, 0).toFixed(0),
    10,
  )

  const prtn = parseInt(
    foods.reduce((prev, curr) => prev + curr.protein, 0).toFixed(0),
    10,
  )

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-1/2 flex-col justify-start">
            <span className="text-3xl font-bold">Nutrition</span>
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
            <div className="flex flex-col gap-y-2">
              <GoalPieChart title="Calories" goal={10000} curr={cals} />
              <GoalPieChart title="Protein (g)" goal={10000} curr={prtn} />
            </div>
            <div className="flex flex-col gap-y-2">
              <GoalPieChart title="Fat (g)" goal={10000} curr={fats} />
              <GoalPieChart title="Carbs (g)" goal={10000} curr={carbs} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Foods</span>
            <PlusIcon />
          </div>
          <div className="rounded-lg border p-2">
            <Table>
              {/* TODO: allow bulk deletion of foods */}
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Cals</TableHead>
                  <TableHead>Carbs</TableHead>
                  <TableHead>Fat</TableHead>
                  <TableHead>Protein</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((m, i) => {
                  return (
                    // TODO: when you click on a row, display the full food details
                    /* TODO: allow foods to be edited/deleted */
                    <TableRow key={i}>
                      <TableCell>{m.createdAt.toLocaleTimeString()}</TableCell>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.calories.toFixed(1)}</TableCell>
                      <TableCell>{m.carbs.toFixed(1)}</TableCell>
                      <TableCell>{m.fat.toFixed(1)}</TableCell>
                      <TableCell>{m.protein.toFixed(1)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
