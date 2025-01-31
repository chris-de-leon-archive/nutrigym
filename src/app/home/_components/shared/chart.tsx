import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Dataset } from "../../_lib"
import {
  ChartTooltipContent,
  ChartLegendContent,
  ChartContainer,
  ChartTooltip,
  ChartConfig,
  ChartLegend,
} from "@nutrigym/components/ui/chart"

export type ChartProps<T extends string> = {
  dataset: Dataset<T>
  today: Date
}

export function Chart<T extends string>(props: ChartProps<T>) {
  const chartData = props.dataset.points.map((point) => {
    return {
      date: new Intl.DateTimeFormat("en-US").format(point.date),
      [props.dataset.title]: point.value,
    }
  })

  const chartConf: ChartConfig = {
    [props.dataset.title]: {
      label: `${props.dataset.label} ${props.dataset.units}`,
      color: props.dataset.color,
    },
  }

  return (
    <ChartContainer config={chartConf} className="aspect-auto h-[250px] w-full">
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
              nameKey={props.dataset.title}
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
          dataKey={props.dataset.title}
          type={props.dataset.style.line}
          stroke={`var(--color-${props.dataset.title})`}
          strokeWidth={2}
          activeDot={{ r: 6 }}
          dot={
            props.dataset.style.dots
              ? { fill: `var(--color-${props.dataset.title})` }
              : false
          }
        />
        {props.dataset.style.legend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </LineChart>
    </ChartContainer>
  )
}
