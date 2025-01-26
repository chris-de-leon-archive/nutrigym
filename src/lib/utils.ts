import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stripNull = <T>(val: T | undefined | null) => {
  return val == null ? undefined : val
}

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
) => {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key]
      }
      return acc
    },
    {} as Pick<T, K>,
  )
}
