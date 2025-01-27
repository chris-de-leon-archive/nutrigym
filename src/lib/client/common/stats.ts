import { Trend } from "./enums"

export class Stats {
  static calculateOverallTrend = (values: number[]) => {
    if (values.length < 2) {
      return {
        averagePercentChange: Number.NaN,
        trend: Trend.None,
      }
    }

    let [totalPercentChange, count] = [0, 0]
    for (let i = 1; i < values.length; i++) {
      const [prev, curr] = [values[i - 1], values[i]]
      if (prev !== 0) {
        totalPercentChange += ((curr - prev) / prev) * 100
        count++
      }
    }

    if (count === 0) {
      return {
        averagePercentChange: Number.NaN,
        trend: Trend.None,
      }
    }

    const averagePercentChange = totalPercentChange / count
    return {
      averagePercentChange,
      trend:
        averagePercentChange > 0
          ? Trend.Up
          : averagePercentChange < 0
            ? Trend.Down
            : Trend.Flat,
    }
  }
}
