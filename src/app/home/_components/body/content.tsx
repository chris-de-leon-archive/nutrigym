import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { DateTime } from "@nutrigym/lib/client/common"
import { BodyMeasurementChart } from "./chart"
import {
  BodyMeasurementOverTimeDocument,
  BodyMeasurementKey,
} from "@nutrigym/lib/client/graphql"
import {
  getBodyDatasetDetails,
  getDatesFromTimeRange,
  formatMeasurements,
  timeRangeToValue,
  LineStyle,
} from "../../_lib"

export type BodyContentProps = {
  today: Date
}

export async function BodyContent(props: BodyContentProps) {
  const defaults = {
    window: "30d",
    range: "90d",
  } as const

  const { start, final } = getDatesFromTimeRange(props.today, defaults.range)
  const window = timeRangeToValue(defaults.window)
  const { bodyMeasurementOverTime: weights } = await makeRequestOrThrow(
    BodyMeasurementOverTimeDocument,
    {
      key: BodyMeasurementKey.WeightInLbs,
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
    <BodyMeasurementChart
      today={props.today}
      default={{
        ...getBodyDatasetDetails(BodyMeasurementKey.WeightInLbs),
        points: formatMeasurements(weights),
        window: defaults.window,
        range: defaults.range,
        style: {
          legend: false,
          line: LineStyle.Natural,
          dots: false,
        },
      }}
    />
  )
}
