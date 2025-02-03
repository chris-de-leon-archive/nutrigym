import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Loading } from "@nutrigym/components/loading"
import { DateTime } from "@nutrigym/lib/client/common"
import { ContentContainer } from "../shared"
import { refetch } from "./actions"
import { Suspense } from "react"
import {
  FoodAnalyticsDocument,
  FoodMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  getNutritionDatasetDetails,
  FoodMeasurementChartTitle,
  getDatesFromTimeRange,
  formatMeasurements,
  LineStyle,
} from "../../_lib"

export type NutritionContentProps = {
  today: Date
}

export function NutritionContent(props: NutritionContentProps) {
  const defaults = {
    key: FoodMeasurementKey.Calories,
    window: "None",
    range: "7d",
  } as const

  const { start, final } = getDatesFromTimeRange(props.today, defaults.range)
  const dataset = makeRequestOrThrow(FoodAnalyticsDocument, {
    key: defaults.key,
    date: {
      start: DateTime.asApiDateString(start),
      final: DateTime.asApiDateString(final),
    },
  }).then(({ foodMeasurementsOverTime, foodStats }) => {
    return {
      ...getNutritionDatasetDetails(defaults.key),
      points: formatMeasurements(foodMeasurementsOverTime),
      window: defaults.window,
      range: defaults.range,
      stats: foodStats,
      style: {
        legend: true,
        line: LineStyle.Natural,
        dots: true,
      },
    }
  })

  return (
    <Suspense fallback=<Loading />>
      <ContentContainer
        titles={FoodMeasurementChartTitle}
        today={props.today}
        refetch={refetch}
        dataset={dataset}
      />
    </Suspense>
  )
}
