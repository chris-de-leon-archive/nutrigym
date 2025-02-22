import { Statistic } from "@nutrigym/lib/client/graphql"
import { DateTime } from "@nutrigym/lib/client/common"
import { DateDataPoint } from "./types"

export const formatMeasurements = (dataset: Statistic) => {
  const points = new Array<DateDataPoint>()
  dataset.data.forEach((datapoint) => {
    if (datapoint.value != null) {
      points.push({
        date: DateTime.parseApiDateString(datapoint.key),
        value: datapoint.value,
      })
    }
  })
  return points
}

// TODO: remove
export const randVals = () =>
  Array.from({ length: 100 })
    .map((_, i) => {
      return {
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        value: Math.random() * 1000,
      }
    })
    .reverse()
