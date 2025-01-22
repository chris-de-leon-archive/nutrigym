import { builder } from "@nutrigym/lib/server/api"

// NOTE: all percentages are required to simplify validations and avoid extra database queries
export const input = builder.inputType("UpdateGoalInput", {
  fields: (t) => ({
    waterInMilliliters: t.float({ required: false }),
    weightInPounds: t.float({ required: false }),
    sleepInHours: t.float({ required: false }),
    proteinPercentage: t.float({ required: true }),
    carbsPercentage: t.float({ required: true }),
    fatPercentage: t.float({ required: true }),
    calories: t.float({ required: false }),
    steps: t.int({ required: false }),
  }),
})
