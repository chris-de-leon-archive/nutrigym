import { requireAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../../scalars"
import { types } from "../types"
import { input } from "./types"

builder.mutationField("createFoodMeasurementFromFoodID", (t) =>
  t.field({
    type: [types.foodMeasurement],
    args: {
      date: t.arg({ type: scalars.localdate, required: true }),
      data: t.arg({ type: input, required: true }),
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
