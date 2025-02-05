import { scalars } from "../../../scalars"
import { inputs } from "../../../inputs"
import { enums } from "../../../enums"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "createFoodMeasurement"

const input = builder.inputType("CreateFoodMeasurementInput", {
  fields: (t) => ({
    servingsConsumed: t.float({ required: true }),
    mealType: t.field({ type: enums.mealType, required: true }),
    food: t.field({ type: inputs.uuid, required: true }),
  }),
})

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.foodMeasurement],
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
