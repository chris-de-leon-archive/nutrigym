import { requireAuth } from "@nutrigym/lib/server/api/auth"
import { builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../../scalars"
import { types } from "../types"

builder.mutationField("removeFoodMeasurements", (t) =>
  t.field({
    type: [types.foodMeasurement],
    args: {
      ids: t.arg({ type: [scalars.uuid], required: true }),
      date: t.arg({ type: scalars.localdate, required: true }),
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
