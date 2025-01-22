export const isValidUpdateObject = <T extends object>(obj: T) => {
  // Returns true if there is at least one value which is NOT undefined
  // Returns false if all values are undefined
  return Object.values(obj).some((v) => v !== undefined)
}
