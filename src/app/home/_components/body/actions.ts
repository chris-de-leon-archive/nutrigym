"use server"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { AssertUnreachable } from "@nutrigym/lib/assert"
import { DateTime } from "@nutrigym/lib/client/common"
import { RefetchFn } from "../shared"
import {
  BodyAnalyticsDocument,
  BodyMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  BodyMeasurementChartTitle,
  getDatesFromTimeRange,
  getBodyDatasetDetails,
  formatMeasurements,
  timeRangeIsPresent,
  timeRangeToValue,
} from "../../_lib"

export const refetch: RefetchFn<
  typeof BodyMeasurementChartTitle,
  keyof typeof BodyMeasurementChartTitle
> = async (ctx, values) => {
  const range = getDatesFromTimeRange(ctx.today, values.range)
  const start = DateTime.asApiDateString(range.start)
  const final = DateTime.asApiDateString(range.final)

  const opts = timeRangeIsPresent(values.window)
    ? { rollingAverage: { window: timeRangeToValue(values.window) } }
    : undefined

  const refetchDataset = async (key: BodyMeasurementKey) => {
    return makeRequestOrThrow(BodyAnalyticsDocument, {
      key,
      date: { start, final },
      options: opts,
    }).then(({ bodyMeasurementOverTime, bodyStats }) => {
      return {
        ...getBodyDatasetDetails(key),
        points: formatMeasurements(bodyMeasurementOverTime),
        window: values.window,
        range: values.range,
        stats: bodyStats,
        style: {
          legend: values.displayLegend,
          dots: values.displayDots,
          line: values.lineStyle,
        },
      }
    })
  }

  switch (values.title) {
    case BodyMeasurementChartTitle.Weight:
      return refetchDataset(BodyMeasurementKey.WeightInLbs)
    case BodyMeasurementChartTitle.Water:
      return refetchDataset(BodyMeasurementKey.WaterInMl)
    case BodyMeasurementChartTitle.Sleep:
      return refetchDataset(BodyMeasurementKey.SleepInHrs)
    case BodyMeasurementChartTitle.Steps:
      return refetchDataset(BodyMeasurementKey.Steps)
    default:
      return AssertUnreachable(values.title)
  }
}
