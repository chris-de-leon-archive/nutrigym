import { requireAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../scalars"
import { types } from "../types"

builder.queryField("goalByClosestDate", (t) =>
  t.field({
    type: types.goal,
    nullable: true,
    args: {
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
