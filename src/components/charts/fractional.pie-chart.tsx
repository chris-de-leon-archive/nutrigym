"use client"

import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nutrigym/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@nutrigym/components/ui/chart"

export type FractionalPieChartProps = {
  title: string
  description: string
  slices: {
    category: string
    value: number
    label: string
    color: string
    units: string
  }[]
}

export function FractionalPieChart(props: FractionalPieChartProps) {
  const chartData = props.slices.map((s) => {
    return {
      category: s.category,
      value: s.value,
      fill: `var(--color-${s.category})`,
    }
  })

  const chartConf: ChartConfig = Object.fromEntries(
    props.slices.map((s) => {
      return [
        s.category,
        {
          label: `${s.label} ${s.units}`,
          color: s.color,
        },
      ]
    }),
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConf}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie data={chartData} dataKey="value">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConf) =>
                  chartConf[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
