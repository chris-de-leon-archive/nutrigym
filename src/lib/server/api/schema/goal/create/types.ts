import { builder } from "@nutrigym/lib/server/api"

export const input = builder.inputType("CreateGoalInput", {
  fields: (t) => ({
    waterInMilliliters: t.float({ required: true }),
    weightInPounds: t.float({ required: true }),
    sleepInHours: t.float({ required: true }),
    proteinPercentage: t.float({ required: true }),
    carbsPercentage: t.float({ required: true }),
    fatPercentage: t.float({ required: true }),
    calories: t.float({ required: true }),
    steps: t.int({ required: true }),
  }),
})
