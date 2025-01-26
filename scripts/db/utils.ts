export const generateDatesInYear = (year: number) => {
  const dates = new Array<string>()
  const start = new Date(year, 0, 1)
  const final = new Date(year + 1, 0, 1)

  const incr = (datetime: Date) =>
    new Date(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate() + 1,
    )

  for (let curr = new Date(start); curr < final; curr = incr(curr)) {
    dates.push(
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(curr),
    )
  }

  return dates
}
