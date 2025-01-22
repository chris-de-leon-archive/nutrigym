import { builder } from "@nutrigym/lib/server/api"

export const input = builder.inputType("CreateBodyMeasurementInput", {
  fields: (t) => ({
    waterInMilliliters: t.float({ required: false }),
    heightInInches: t.float({ required: true }),
    weightInPounds: t.float({ required: true }),
    sleepInHours: t.float({ required: false }),
    shouldersInInches: t.float({ required: false }),
    forearmsInInches: t.float({ required: false }),
    calvesInInches: t.float({ required: false }),
    thighsInInches: t.float({ required: false }),
    waistInInches: t.float({ required: false }),
    chestInInches: t.float({ required: false }),
    armsInInches: t.float({ required: false }),
    neckInInches: t.float({ required: false }),
    hipsInInches: t.float({ required: false }),
    steps: t.int({ required: false }),
  }),
})
