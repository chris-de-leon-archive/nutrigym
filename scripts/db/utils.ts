export const generateDatesToPresent = (start: Date) => {
  const dates = new Array<string>()
  const final = new Date()

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
