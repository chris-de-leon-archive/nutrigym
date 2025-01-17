export const caloriesToGrams = (cals: number) => {
  return cals * 0.129598
}

export const calculatePortion = (total: number, percentage: number) => {
  return Math.round(((percentage ?? 0) / 100) * total)
}
