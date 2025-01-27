import { requireAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { enums } from "../../enums"
import { types } from "../types"

builder.queryField("bodyMeasurementOverTime", (t) =>
  t.field({
    type: [types.dateDataPoint],
    args: {
      key: t.arg({
        type: enums.bodyMeasurementKey,
        required: true,
      }),
      date: t.arg({
        type: types.inclusiveDateRangeInput,
        required: true,
      }),
      options: t.arg({
        type: types.transformationOptionsInput,
        required: false,
      }),
    },
    validate: {
      schema: zInput,
    },
    resolve: async (_, args, ctx) => {
      return await requireAuth(ctx, async (auth) => {
        return await handler(args, auth)
      })
    },
  }),
)
