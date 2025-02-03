import { scalars } from "../../scalars"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "createGoal"

const input = builder.inputType("CreateGoalInput", {
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

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.goal],
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
