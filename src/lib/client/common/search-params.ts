import { NextSearchParams } from "./types"

export const SearchParams = {
  date: {
    href: (pathname: string, date: Date) => {
      const searchParams = new URLSearchParams({ date: date.toISOString() })
      return `${pathname}?${searchParams.toString()}`
    },
    parse: async ({ searchParams }: NextSearchParams) => {
      const rawDate = (await searchParams)["date"]
      const strDate = Array.isArray(rawDate) ? rawDate.at(0) : rawDate
      return strDate != null ? new Date(strDate) : new Date()
    },
  },
}
