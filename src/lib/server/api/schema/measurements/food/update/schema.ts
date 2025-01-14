import { builder, withAuth } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { objects } from "../../../objects"
import { scalars } from "../../../scalars"
import { input } from "./types"

builder.mutationField("updateFoodMeasurement", (t) =>
  t.field({
    type: objects.count,
    args: {
      id: t.arg({ type: scalars.uuid, required: true }),
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
