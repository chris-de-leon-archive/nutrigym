import { requireAuth } from "@nutrigym/lib/server/api/auth"
import { builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { types } from "../types"
import { input } from "./types"

builder.mutationField("createBody", (t) =>
  t.field({
    type: [types.body],
    args: {
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
