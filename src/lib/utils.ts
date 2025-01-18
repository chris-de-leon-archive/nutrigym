import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stripNull = <T>(val: T | undefined | null) => {
  return val == null ? undefined : val
}
