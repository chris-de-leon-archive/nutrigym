import { scalars } from "../../scalars"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "updateGoal"

// NOTE: all percentages are required to simplify validations and avoid extra database queries
const input = builder.inputType("UpdateGoalInput", {
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

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.goal],
    args: {
      id: t.arg({ type: scalars.uuid, required: true }),
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
