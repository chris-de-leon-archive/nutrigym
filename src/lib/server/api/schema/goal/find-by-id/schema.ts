import { withAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../scalars"
import { types } from "../types"

builder.queryField("goalByID", (t) =>
  t.field({
    type: types.goal,
    nullable: true,
    args: {
      id: t.arg({ type: scalars.uuid, required: true }),
    },
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
