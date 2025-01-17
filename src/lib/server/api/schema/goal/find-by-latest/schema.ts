import { withAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { types } from "../types"

builder.queryField("goalByLatest", (t) =>
  t.field({
    type: types.goal,
    nullable: true,
    args: {},
    validate: {
      schema: zInput,
    },
    resolve: async (_, args, ctx) => {
      return await withAuth(ctx, async (auth) => {
        return await handler(args, { ...ctx, ...auth })
      })
    },
  }),
)
