import { scalars } from "../../../scalars"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "createBodyMeasurement"

const input = builder.inputType("CreateBodyMeasurementInput", {
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

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.bodyMeasurement],
    args: {
      date: t.arg({ type: scalars.localdate, required: true }),
      data: t.arg({ type: input, required: true }),
    },
    validate: {
      schema: resolver.input,
    },
    resolve: async (_, args, ctx) => {
      return await requireAuth(ctx, async (auth) => {
        return await resolver.handler(args, auth)
      })
    },
  }),
)

export const schema = defineOperationSchema({
  name,
  input,
})
