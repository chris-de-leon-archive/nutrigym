"use server"

import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { AssertUnreachable } from "@nutrigym/lib/assert"
import { DateTime } from "@nutrigym/lib/client/common"
import { RefetchFn } from "../shared"
import {
  FoodAnalyticsDocument,
  FoodMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  getNutritionDatasetDetails,
  FoodMeasurementChartTitle,
  getDatesFromTimeRange,
  formatMeasurements,
  timeRangeIsPresent,
  timeRangeToValue,
} from "../../_lib"

export const refetch: RefetchFn<
  typeof FoodMeasurementChartTitle,
  keyof typeof FoodMeasurementChartTitle
> = async (ctx, values) => {
  const range = getDatesFromTimeRange(ctx.today, values.range)
  const start = DateTime.asApiDateString(range.start)
  const final = DateTime.asApiDateString(range.final)

  const opts = timeRangeIsPresent(values.window)
    ? { rollingAverage: { window: timeRangeToValue(values.window) } }
    : undefined

  const refetchDataset = async (key: FoodMeasurementKey) => {
    return makeRequestOrThrow(FoodAnalyticsDocument, {
      key,
      date: { start, final },
      options: opts,
    }).then(({ foodMeasurementsOverTime, foodStats }) => {
      return {
        ...getNutritionDatasetDetails(key),
        points: formatMeasurements(foodMeasurementsOverTime),
        window: values.window,
        range: values.range,
        stats: foodStats,
        style: {
          legend: values.displayLegend,
          dots: values.displayDots,
          line: values.lineStyle,
        },
      }
    })
  }

  switch (values.title) {
    case FoodMeasurementChartTitle.Calories:
      return refetchDataset(FoodMeasurementKey.Calories)
    case FoodMeasurementChartTitle.Protein:
      return refetchDataset(FoodMeasurementKey.Protein)
    case FoodMeasurementChartTitle.Carbs:
      return refetchDataset(FoodMeasurementKey.Carbs)
    case FoodMeasurementChartTitle.Fats:
      return refetchDataset(FoodMeasurementKey.Fats)
    default:
      return AssertUnreachable(values.title)
  }
}
