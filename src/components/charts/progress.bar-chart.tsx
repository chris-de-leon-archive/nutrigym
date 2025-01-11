"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nutrigym/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@nutrigym/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nutrigym/components/ui/select"

export type ProgressBarChartProps = {
  title: string
  defaults: {
    datasetId: string
    timeRange: "90d" | "30d" | "7d"
  }
  datasets: {
    id: string
    label: string
    color: string
    units: string
    points: {
      date: Date
      value: number
    }[]
  }[]
}

export function ProgressBarChart(props: ProgressBarChartProps) {
  const [datasetId, setDatasetId] = useState<string>(props.defaults.datasetId)
  const [timeRange, setTimeRange] = useState<string>(props.defaults.timeRange)
  const referenceDate = new Date()

  const points = new Map<string, Record<string, number>>()
  props.datasets.forEach((dataset) => {
    dataset.points.forEach((point) => {
      const date = new Intl.DateTimeFormat("en-US").format(point.date)
      const vals = points.get(date)
      if (vals == null) {
        points.set(date, { [dataset.id]: point.value })
      } else {
        points.set(date, { ...vals, [dataset.id]: point.value })
      }
    })
  })

  const chartData = Array.from(points.entries())
    .filter(([date]) => {
      const threshold = new Date(referenceDate)

      threshold.setDate(
        referenceDate.getDate() -
          (timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90),
      )

      return new Date(date) >= threshold
    })
    .map(([date, values]) => {
      return { date, ...values }
    })

  const chartConf: ChartConfig = Object.fromEntries(
    props.datasets.map((dataset) => {
      return [
        dataset.id,
        {
          label: `${dataset.label} ${dataset.units}`,
          color: dataset.color,
        },
      ]
    }),
  )

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConf}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={datasetId}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={datasetId} fill={`var(--color-${datasetId})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center justify-around">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-2/5 rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={datasetId} onValueChange={setDatasetId}>
          <SelectTrigger
            className="w-2/5 rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {props.datasets.map((dataset, i) => {
              return (
                <SelectItem key={i} value={dataset.id} className="rounded-lg">
                  {dataset.label} {dataset.units}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  )
}
