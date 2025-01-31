import { requireAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { types } from "../types"

builder.queryField("foodStats", (t) =>
  t.field({
    type: [types.statistic],
    args: {
      date: t.arg({
        type: types.inclusiveDateRangeInput,
        required: true,
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
