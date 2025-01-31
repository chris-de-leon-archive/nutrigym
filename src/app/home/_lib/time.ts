import { AssertUnreachable } from "@nutrigym/lib/assert"
import { DateTime } from "@nutrigym/lib/client/common"

const TimeRange = {
  _None: "None",
  _07d: "7d",
  _30d: "30d",
  _60d: "60d",
  _90d: "90d",
  _120d: "120d",
} as const

export const OptionalTimeRangeValues = [
  TimeRange._None,
  TimeRange._07d,
  TimeRange._30d,
  TimeRange._60d,
  TimeRange._90d,
  TimeRange._120d,
] as const

export type OptionalTimeRangeType =
  | typeof TimeRange._None
  | typeof TimeRange._07d
  | typeof TimeRange._30d
  | typeof TimeRange._60d
  | typeof TimeRange._90d
  | typeof TimeRange._120d

export const RequiredTimeRangeValues = [
  TimeRange._07d,
  TimeRange._30d,
  TimeRange._60d,
  TimeRange._90d,
  TimeRange._120d,
] as const

export type RequiredTimeRangeType =
  | typeof TimeRange._07d
  | typeof TimeRange._30d
  | typeof TimeRange._60d
  | typeof TimeRange._90d
  | typeof TimeRange._120d

export const timeRangeIsPresent = (
  t: OptionalTimeRangeType,
): t is RequiredTimeRangeType => {
  return t !== TimeRange._None
}

export const timeRangeToValue = (t: RequiredTimeRangeType) => {
  switch (t) {
    case TimeRange._07d:
      return 7
    case TimeRange._30d:
      return 30
    case TimeRange._60d:
      return 60
    case TimeRange._90d:
      return 90
    case TimeRange._120d:
      return 120
    default:
      return AssertUnreachable(t)
  }
}

export const getDatesFromTimeRange = (
  today: Date,
  range: RequiredTimeRangeType,
) => {
  const final = DateTime.clearLocalTime(today)
  const start = DateTime.clearLocalTime(today)
  return {
    final,
    start: DateTime.setLocalDate(
      start,
      start.getDate() - timeRangeToValue(range) + 1,
    ),
  }
}
