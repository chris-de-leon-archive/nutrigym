import { Goal } from "@nutrigym/lib/schema"
import { createHash } from "node:crypto"

export const makeVersionHash = (
  goal: Goal | Omit<Goal, "id" | "userId" | "createdAt" | "version" | "latest">,
) => {
  const keys: (keyof Goal | string)[] = [
    "waterInMilliliters",
    "weightInPounds",
    "sleepInHours",
    "proteinPercentage",
    "carbsPercentage",
    "fatPercentage",
    "calories",
    "steps",
  ]

  return createHash("md5")
    .update(JSON.stringify(goal, keys.sort()))
    .digest("hex")
}
