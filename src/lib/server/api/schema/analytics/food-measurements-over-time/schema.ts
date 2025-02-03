import { resolver } from "./resolver"
import { enums } from "../../enums"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "foodMeasurementsOverTime"

builder.queryField(name, (t) =>
  t.field({
    type: types.objects.statistic,
    args: {
      key: t.arg({
        type: enums.foodMeasurementKey,
        required: true,
      }),
      date: t.arg({
        type: types.inputs.inclusiveDateRangeInput,
        required: true,
      }),
      options: t.arg({
        type: types.inputs.transformationOptionsInput,
        required: false,
      }),
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
  input: undefined,
})
