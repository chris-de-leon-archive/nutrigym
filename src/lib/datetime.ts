export const MAX_MONTHS_IN_A_YEAR = 12
export const MAX_LOOKBACK_YEARS = 200

export const stringToDate = (date: Date | string) => {
  return typeof date === "string" ? new Date(date) : date
}

export const getMonthName = (date: Date) => {
  return date.toLocaleString("default", {
    month: "long",
  })
}

export const daysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate()
}

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date)
}

export const setMonth = (date: Date, month: number) => {
  const d = new Date(date)
  d.setMonth(month)
  return d
}

export const setYear = (date: Date, year: number) => {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

export const setDay = (date: Date, day: number) => {
  const d = new Date(date)
  d.setDate(day)
  return d
}
