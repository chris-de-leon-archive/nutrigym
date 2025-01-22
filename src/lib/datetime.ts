export const MAX_MONTHS_IN_A_YEAR = 12
export const MAX_LOOKBACK_YEARS = 200

export class DateTime {
  static computeAge = (today: Date, birthday: Date) => {
    // Gather inputs
    const age = today.getFullYear() - birthday.getFullYear()

    // The birthday month has already passed, so we can return the age as-is
    if (today.getMonth() > birthday.getMonth()) {
      return age
    }

    // The birthday month has not happened yet, so we need to subtract 1 from the age
    if (today.getMonth() < birthday.getMonth()) {
      return age - 1
    }

    // If it is currently the birthday month, subtract 1 if the birthday hasn't passed yet
    if (today.getDate() < birthday.getDate()) {
      return age - 1
    } else {
      return age
    }
  }

  static stringToDate = (date: Date | string) => {
    return typeof date === "string" ? new Date(date) : date
  }

  static getMonthName = (date: Date) => {
    return date.toLocaleString("default", {
      month: "long",
    })
  }

  static daysInMonth = (date: Date) => {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 0),
    ).getUTCDate()
  }

  static formatDate = (date: Date) => {
    const m = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    const d = date.getUTCDate().toString().padStart(2, "0")
    const y = date.getUTCFullYear()
    return `${y}-${m}-${d}`
  }

  static formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

  static setMonth = (date: Date, month: number) => {
    const d = new Date(date)
    d.setMonth(month)
    return d
  }

  static setYear = (date: Date, year: number) => {
    const d = new Date(date)
    d.setFullYear(year)
    return d
  }

  static setDate = (date: Date, day: number) => {
    const d = new Date(date)
    d.setDate(day)
    return d
  }

  static lt = (date1: Date, date2: Date) => {
    return this.compareDates(date1, date2) > 0
  }

  static gt = (date1: Date, date2: Date) => {
    return this.compareDates(date1, date2) < 0
  }

  static eq = (date1: Date, date2: Date) => {
    return this.compareDates(date1, date2) === 0
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
