import { DateTime } from "@nutrigym/lib/client/common"

const _None = "None"
const _07d = "7d"
const _30d = "30d"
const _60d = "60d"
const _90d = "90d"

const TimeRangeToValue = new Map<RequiredTimeRangeType, number>([
  [_07d, 7],
  [_30d, 30],
  [_60d, 60],
  [_90d, 90],
])

export const OptionalTimeRangeValues = [_None, _07d, _30d, _60d, _90d] as const
export type OptionalTimeRangeType =
  | typeof _None
  | typeof _07d
  | typeof _30d
  | typeof _60d
  | typeof _90d

export const RequiredTimeRangeValues = [_07d, _30d, _60d, _90d] as const
export type RequiredTimeRangeType =
  | typeof _07d
  | typeof _30d
  | typeof _60d
  | typeof _90d

export const timeRangeIsPresent = (
  t: OptionalTimeRangeType,
): t is RequiredTimeRangeType => {
  return t !== _None
}

export const timeRangeToValue = (t: RequiredTimeRangeType) => {
  const val = TimeRangeToValue.get(t)
  if (val == null) {
    throw new Error(`invalid time range: ${t}`)
  } else {
    return val
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
      start.getDate() - timeRangeToValue(range),
    ),
  }
}
