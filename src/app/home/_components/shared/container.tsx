"use client"

import { SettingsPopover } from "./settings.popover"
import { Dataset } from "../../_lib"
import { RefetchFn } from "./types"
import { useState } from "react"
import { Chart } from "./chart"
import { Stats } from "./stats"
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@nutrigym/components/ui/card"

export type ContentContainerProps<
  T extends Record<string, string>,
  K extends keyof T,
> = {
  refetch: RefetchFn<T, K>
  dataset: Dataset<T[K]>
  titles: T
  today: Date
}

export function ContentContainer<
  T extends Record<string, string>,
  K extends keyof T,
>(props: ContentContainerProps<T, K>) {
  const [dataset, setDataset] = useState(props.dataset)

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col justify-start gap-y-2">
              <CardTitle>{dataset.title}</CardTitle>
              <CardDescription>
                Viewing data for past {dataset.range}
              </CardDescription>
            </div>
            <SettingsPopover
              dataset={dataset}
              titles={props.titles}
              onSubmit={(values) => {
                const ctx = { today: props.today }
                props.refetch(ctx, values).then(setDataset)
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <Chart today={props.today} dataset={dataset} />
        </CardContent>
      </Card>
      <Stats dataset={dataset} />
    </div>
  )
}
