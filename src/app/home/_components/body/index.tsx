import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { ContentContainer } from "../shared"
import { refetch } from "./actions"
import {
  BodyAnalyticsDocument,
  BodyMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  BodyMeasurementChartTitle,
  getDatesFromTimeRange,
  getBodyDatasetDetails,
  formatMeasurements,
  timeRangeToValue,
  LineStyle,
} from "../../_lib"

export type BodyContentProps = {
  today: Date
}

export async function BodyContent(props: BodyContentProps) {
  const defaults = {
    key: BodyMeasurementKey.WeightInLbs,
    window: "30d",
    range: "90d",
  } as const

  const { start, final } = getDatesFromTimeRange(props.today, defaults.range)
  const window = timeRangeToValue(defaults.window)
  const { bodyMeasurementOverTime, bodyStats } = await makeRequestOrThrow(
    BodyAnalyticsDocument,
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
      titles={BodyMeasurementChartTitle}
      today={props.today}
      refetch={refetch}
      dataset={{
        ...getBodyDatasetDetails(defaults.key),
        points: formatMeasurements(bodyMeasurementOverTime),
        window: defaults.window,
        range: defaults.range,
        stats: bodyStats,
        style: {
          legend: true,
          line: LineStyle.Natural,
          dots: false,
        },
      }}
    />
  )
}
