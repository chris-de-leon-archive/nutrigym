import { TOLERANCE } from "../../constants"

export const doPercentagesSumTo100 = (
  percentages: number[],
  tolerance = TOLERANCE,
) => {
  const total = percentages.reduce((agg, val) => agg + val, 0)
  if (Math.abs(total - 100) >= tolerance) {
    return new Error(`percentages must sum to 100 (got ${total})`)
  } else {
    return undefined
  }
}
