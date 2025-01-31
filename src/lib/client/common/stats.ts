import { Trend } from "./enums"

export class Stats {
  static percentChange = (
    start: number | undefined,
    final: number | undefined,
  ) => {
    if (start == null || final == null) {
      return {
        percentChange: Number.NaN,
        trend: Trend.None,
      }
    }

    if (final === 0) {
      return {
        percentChange: Number.NaN,
        trend: Trend.None,
      }
    }

    const percentChange = ((final - start) / final) * 100
    return {
      percentChange,
      trend:
        percentChange > 0
          ? Trend.Up
          : percentChange < 0
            ? Trend.Down
            : Trend.Flat,
    }
  }
}
