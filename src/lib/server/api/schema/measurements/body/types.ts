import { BodyMeasurement } from "@nutrigym/lib/schema"
import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"

const bodyMeasurement = builder.objectRef<BodyMeasurement>("BodyMeasurement")

builder.objectType(bodyMeasurement, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.date }),
    logId: t.exposeString("logId"),
    weightInPounds: t.exposeFloat("weightInPounds"),
    heightInInches: t.exposeFloat("heightInInches"),
    waterInMilliliters: t.exposeFloat("waterInMilliliters", { nullable: true }),
    shouldersInInches: t.exposeFloat("shouldersInInches", { nullable: true }),
    forearmsInInches: t.exposeFloat("forearmsInInches", { nullable: true }),
    calvesInInches: t.exposeFloat("calvesInInches", { nullable: true }),
    thighsInInches: t.exposeFloat("thighsInInches", { nullable: true }),
    waistInInches: t.exposeFloat("waistInInches", { nullable: true }),
    chestInInches: t.exposeFloat("chestInInches", { nullable: true }),
    armsInInches: t.exposeFloat("armsInInches", { nullable: true }),
    neckInInches: t.exposeFloat("neckInInches", { nullable: true }),
    hipsInInches: t.exposeFloat("hipsInInches", { nullable: true }),
    sleepInHours: t.exposeFloat("sleepInHours", { nullable: true }),
    steps: t.exposeInt("steps", { nullable: true }),
  }),
})

export const types = {
  bodyMeasurement,
}
