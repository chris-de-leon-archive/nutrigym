"use client"

import { Popover, PopoverContent } from "@nutrigym/components/ui/popover"
import { DateTime, Stats, Trend } from "@nutrigym/lib/client/common"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Switch } from "@nutrigym/components/ui/switch"
import { Button } from "@nutrigym/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { SlidersHorizontalIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@nutrigym/components/ui/select"
import {
  ChartTooltipContent,
  ChartContainer,
  ChartTooltip,
  ChartConfig,
  ChartLegendContent,
  ChartLegend,
} from "@nutrigym/components/ui/chart"
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@nutrigym/components/ui/card"
import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  Form,
} from "@nutrigym/components/ui/form"
import {
  BodyMeasurementOverTimeDocument,
  BodyMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  BodyMeasurementChartTitle,
  RequiredTimeRangeValues,
  OptionalTimeRangeValues,
  RequiredTimeRangeType,
  OptionalTimeRangeType,
  getBodyDatasetDetails,
  getDatesFromTimeRange,
  formatMeasurements,
  timeRangeIsPresent,
  timeRangeToValue,
  LineStyle,
} from "../../_lib"

const formSchema = z.object({
  window: z.enum(OptionalTimeRangeValues),
  title: z.nativeEnum(BodyMeasurementChartTitle),
  range: z.enum(RequiredTimeRangeValues),
  displayLegend: z.boolean(),
  displayDots: z.boolean(),
  lineStyle: z.nativeEnum(LineStyle),
})

type Dataset = {
  window: OptionalTimeRangeType
  title: BodyMeasurementChartTitle
  range: RequiredTimeRangeType
  label: string
  color: string
  units: string
  style: {
    legend: boolean
    line: LineStyle
    dots: boolean
  }
  points: {
    date: Date
    value: number
  }[]
}

export type BodyMeasurementChartProps = {
  default: Dataset
  today: Date
}

export function BodyMeasurementChart(props: BodyMeasurementChartProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [dataset, setDataset] = useState(props.default)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayLegend: props.default.style.legend,
      displayDots: props.default.style.dots,
      lineStyle: props.default.style.line,
      window: props.default.window,
      range: props.default.range,
      title: props.default.title,
    },
  })

  const refetchDataset = async (values: z.infer<typeof formSchema>) => {
    const range = getDatesFromTimeRange(props.today, values.range)
    const start = DateTime.asApiDateString(range.start)
    const final = DateTime.asApiDateString(range.final)

    const opts = timeRangeIsPresent(values.window)
      ? { rollingAverage: { window: timeRangeToValue(values.window) } }
      : undefined

    const refetch = async (key: BodyMeasurementKey) => {
      return makeRequestOrThrow(BodyMeasurementOverTimeDocument, {
        key,
        date: { start, final },
        options: opts,
      }).then(({ bodyMeasurementOverTime }) => {
        return {
          ...getBodyDatasetDetails(key),
          points: formatMeasurements(bodyMeasurementOverTime),
          window: values.window,
          range: values.range,
          style: {
            legend: values.displayLegend,
            dots: values.displayDots,
            line: values.lineStyle,
          },
        }
      })
    }

    const map = new Map<BodyMeasurementChartTitle, Promise<Dataset>>([
      [BodyMeasurementChartTitle.Sleep, refetch(BodyMeasurementKey.SleepInHrs)],
      [BodyMeasurementChartTitle.Water, refetch(BodyMeasurementKey.WaterInMl)],
      [BodyMeasurementChartTitle.Steps, refetch(BodyMeasurementKey.Steps)],
      [
        BodyMeasurementChartTitle.Weight,
        refetch(BodyMeasurementKey.WeightInLbs),
      ],
    ])

    const dataset = map.get(values.title)
    if (dataset == null) {
      throw new Error(`invalid chart: ${values.title}`)
    } else {
      return dataset
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    refetchDataset(values).then((dataset) => {
      setDataset(dataset)
      setIsPopoverOpen(false)
    })
  }

  const chartData = dataset.points.map((point) => {
    return {
      date: new Intl.DateTimeFormat("en-US").format(point.date),
      [dataset.title]: point.value,
    }
  })

  const chartConf: ChartConfig = {
    [dataset.title]: {
      label: `${dataset.label} ${dataset.units}`,
      color: dataset.color,
    },
  }

  const trend = Stats.calculateOverallTrend(
    dataset.points.map(({ value }) => value),
  )

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start gap-y-2">
            <CardTitle>{dataset.title}</CardTitle>
            <CardDescription>
              {trend.trend === Trend.None
                ? `Trending flat over the past ${dataset.range}`
                : `${trend.trend} ${Math.abs(trend.averagePercentChange).toFixed(2)}% over the past ${dataset.range}`}
            </CardDescription>
          </div>
          <div>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontalIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-fit">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Range</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(v: RequiredTimeRangeType) =>
                                  form.setValue("range", v)
                                }
                              >
                                <SelectTrigger
                                  className="rounded-lg"
                                  aria-label="Select a value"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  {RequiredTimeRangeValues.map((v, i) => {
                                    return (
                                      <SelectItem
                                        key={i}
                                        value={v}
                                        className="rounded-lg"
                                      >
                                        {v}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chart</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(v: BodyMeasurementChartTitle) =>
                                  form.setValue("title", v)
                                }
                              >
                                <SelectTrigger
                                  className="rounded-lg"
                                  aria-label="Select a value"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  {Object.values(BodyMeasurementChartTitle).map(
                                    (v, i) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          value={v}
                                          className="rounded-lg"
                                        >
                                          {v}
                                        </SelectItem>
                                      )
                                    },
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="window"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rolling Avg.</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(v: OptionalTimeRangeType) =>
                                  form.setValue("window", v)
                                }
                              >
                                <SelectTrigger
                                  className="rounded-lg"
                                  aria-label="Select a value"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  {OptionalTimeRangeValues.map((v, i) => {
                                    return (
                                      <SelectItem
                                        key={i}
                                        value={v}
                                        className="rounded-lg"
                                      >
                                        {v}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lineStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Line Style</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(v: LineStyle) =>
                                  form.setValue("lineStyle", v)
                                }
                              >
                                <SelectTrigger
                                  className="rounded-lg"
                                  aria-label="Select a value"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  {Object.values(LineStyle).map((v, i) => {
                                    return (
                                      <SelectItem
                                        key={i}
                                        value={v}
                                        className="rounded-lg"
                                      >
                                        {v}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayDots"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Display Dots</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayLegend"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Display Legend</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  </form>
                </Form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConf}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
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
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={dataset.title}
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
            <Line
              dataKey={dataset.title}
              type={dataset.style.line}
              stroke={`var(--color-${dataset.title})`}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={
                dataset.style.dots
                  ? { fill: `var(--color-${dataset.title})` }
                  : false
              }
            />
            {dataset.style.legend && (
              <ChartLegend content={<ChartLegendContent />} />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
