import { withAuth, builder } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../../scalars"
import { types } from "../types"
import { input } from "./types"

// NOTE: the return type should include the entities that should be invalidated in the cache
builder.mutationField("upsertBodyMeasurement", (t) =>
  t.field({
    type: types.bodyMeasurement,
    nullable: true,
    args: {
      date: t.arg({ type: scalars.date, required: true }),
      data: t.arg({ type: input, required: true }),
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
