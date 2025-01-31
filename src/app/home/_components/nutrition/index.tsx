import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { ContentContainer } from "../shared"
import { refetch } from "./actions"
import {
  FoodAnalyticsDocument,
  FoodMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  getNutritionDatasetDetails,
  FoodMeasurementChartTitle,
  getDatesFromTimeRange,
  formatMeasurements,
  timeRangeToValue,
  LineStyle,
} from "../../_lib"

export type NutritionContentProps = {
  today: Date
}

export async function NutritionContent(props: NutritionContentProps) {
  const defaults = {
    key: FoodMeasurementKey.Calories,
    window: "30d",
    range: "90d",
  } as const

  const { start, final } = getDatesFromTimeRange(props.today, defaults.range)
  const window = timeRangeToValue(defaults.window)
  const { foodMeasurementsOverTime, foodStats } = await makeRequestOrThrow(
    FoodAnalyticsDocument,
    {
      key: defaults.key,
      date: {
        start: DateTime.asApiDateString(start),
        final: DateTime.asApiDateString(final),
      },
      options: {
        rollingAverage: {
          window,
        },
      },
    },
  )

  return (
    <ContentContainer
      titles={FoodMeasurementChartTitle}
      today={props.today}
      refetch={refetch}
      dataset={{
        ...getNutritionDatasetDetails(defaults.key),
        points: formatMeasurements(foodMeasurementsOverTime),
        window: defaults.window,
        range: defaults.range,
        stats: foodStats,
        style: {
          legend: true,
          line: LineStyle.Natural,
          dots: false,
        },
      }}
    />
  )
}
