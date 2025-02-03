import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { Loading } from "@nutrigym/components/loading"
import { DateTime } from "@nutrigym/lib/client/common"
import { ContentContainer } from "../shared"
import { refetch } from "./actions"
import { Suspense } from "react"
import {
  BodyAnalyticsDocument,
  BodyMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  BodyMeasurementChartTitle,
  getDatesFromTimeRange,
  getBodyDatasetDetails,
  formatMeasurements,
  LineStyle,
} from "../../_lib"

export type BodyContentProps = {
  today: Date
}

export function BodyContent(props: BodyContentProps) {
  const defaults = {
    key: BodyMeasurementKey.WeightInLbs,
    window: "None",
    range: "7d",
  } as const

  const { start, final } = getDatesFromTimeRange(props.today, defaults.range)
  const dataset = makeRequestOrThrow(BodyAnalyticsDocument, {
    key: defaults.key,
    date: {
      start: DateTime.asApiDateString(start),
      final: DateTime.asApiDateString(final),
    },
  }).then(({ bodyMeasurementOverTime, bodyStats }) => {
    return {
      ...getBodyDatasetDetails(defaults.key),
      points: formatMeasurements(bodyMeasurementOverTime),
      window: defaults.window,
      range: defaults.range,
      stats: bodyStats,
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
        titles={BodyMeasurementChartTitle}
        today={props.today}
        refetch={refetch}
        dataset={dataset}
      />
    </Suspense>
  )
}
