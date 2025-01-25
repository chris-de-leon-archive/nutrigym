import { builder } from "@nutrigym/lib/server/api"
import { Goal } from "@nutrigym/lib/schema"
import { scalars } from "../scalars"

const goal = builder.objectRef<Goal>("Goal")

builder.objectType(goal, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.datetimeISO }),
    waterInMilliliters: t.exposeFloat("waterInMilliliters"),
    weightInPounds: t.exposeFloat("weightInPounds"),
    sleepInHours: t.exposeFloat("sleepInHours"),
    proteinPercentage: t.exposeFloat("proteinPercentage"),
    carbsPercentage: t.exposeFloat("carbsPercentage"),
    fatPercentage: t.exposeFloat("fatPercentage"),
    calories: t.exposeFloat("calories"),
    steps: t.exposeInt("steps"),
    date: t.expose("date", { type: scalars.localdate }),
  }),
})

export const types = {
  goal,
}
