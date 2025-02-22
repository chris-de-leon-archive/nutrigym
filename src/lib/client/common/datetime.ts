export const MAX_MONTHS_IN_A_YEAR = 12
export const MAX_LOOKBACK_YEARS = 200

export class DateTime {
  static computeAge = (today: Date, birthday: Date) => {
    // Gather inputs
    const age = today.getUTCFullYear() - birthday.getUTCFullYear()

    // The birthday month has already passed, so we can return the age as-is
    if (today.getUTCMonth() > birthday.getUTCMonth()) {
      return age
    }

    // The birthday month has not happened yet, so we need to subtract 1 from the age
    if (today.getUTCMonth() < birthday.getUTCMonth()) {
      return age - 1
    }

    // If it is currently the birthday month, subtract 1 if the birthday hasn't passed yet
    if (today.getUTCDate() < birthday.getUTCDate()) {
      return age - 1
    } else {
      return age
    }
  }

  static clearLocalTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  static getLocalMonthName = (date: Date) => {
    return date.toLocaleString("default", {
      month: "long",
    })
  }

  static daysInLocalMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  static prettyLocalDate = (date: Date) => {
    return `${DateTime.getLocalMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`
  }

  static formatLocalDate = (date: Date) => {
    // NOTE: en-CA = YYYY-MM-DD
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date)
  }

  static formatLocalTime = (date: Date) => {
    // NOTE: en-US = HH:MM:SS AM/PM
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

  static parseApiDateTimeISOString = (date: string) => {
    // NOTE: API datetime ISO strings can be converted to date objects without issue
    return new Date(date)
  }

  static parseApiDateString = (date: string) => {
    // NOTE: API date strings are timezone agnostic and always follow the YYYY-MM-DD
    // format, so it is sufficient to parse out the values and pass them to the Date
    const [year, month, day] = date.split("-")
    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
    )
  }

  static asApiDateString = (date: Date) => {
    // NOTE: for caching, the input data is usually used to construct a cache key.
    // If the input variables change, then a new cache key will be created, so we
    // need to be especially careful with dates. Many API endpoints only care about
    // the YYYY-MM-DD portion of a date, so if we pass in dates that reference the
    // same YYYY-MM-DD but have different times attached to them, then this will
    // cause new cache keys to be created, which will reduce performance.
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date)
  }

  static setLocalMonth = (date: Date, month: number) => {
    const d = new Date(date)
    d.setMonth(month)
    return d
  }

  static setLocalYear = (date: Date, year: number) => {
    const d = new Date(date)
    d.setFullYear(year)
    return d
  }

  static setLocalDate = (date: Date, day: number) => {
    const d = new Date(date)
    d.setDate(day)
    return d
  }

  static isEarlierDay = (date: Date, other: Date) => {
    // NOTE: `other` comes before `date`
    return this.compareDates(date, other) < 0
  }

  static isLaterDay = (date: Date, other: Date) => {
    // NOTE: `other` comes after `date`
    return this.compareDates(date, other) > 0
  }

  static isSameDay = (date: Date, other: Date) => {
    // NOTE: `other` and `date` reference the same day
    return this.compareDates(date, other) === 0
  }

  static compareDates(date1: Date, date2: Date) {
    const [year1, year2] = [date1.getUTCFullYear(), date2.getUTCFullYear()]
    const [month1, month2] = [date1.getUTCMonth(), date2.getUTCMonth()]
    const [day1, day2] = [date1.getUTCDate(), date2.getUTCDate()]

    // date1 comes after date2
    if (
      year1 > year2 ||
      (year1 === year2 && month1 > month2) ||
      (year1 === year2 && month1 === month2 && day1 > day2)
    ) {
      return 1
    }

    // date1 comes before date2
    if (
      year1 < year2 ||
      (year1 === year2 && month1 < month2) ||
      (year1 === year2 && month1 === month2 && day1 < day2)
    ) {
      return -1
    }

    // the dates are equal
    return 0
  }
}
