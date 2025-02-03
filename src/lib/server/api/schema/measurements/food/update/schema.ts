import { scalars } from "../../../scalars"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "updateFoodMeasurement"

const input = builder.inputType("UpdateFoodMeasurementInput", {
  fields: (t) => ({
    servingsConsumed: t.float({ required: false }),
  }),
})

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.foodMeasurement],
    args: {
      id: t.arg({ type: scalars.uuid, required: true }),
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
