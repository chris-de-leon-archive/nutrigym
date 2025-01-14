import { builder, withAuth } from "@nutrigym/lib/server/api"
import { handler, zInput } from "./resolver"
import { scalars } from "../../../scalars"
import { objects } from "../../../objects"

builder.mutationField("removeFoodMeasurements", (t) =>
  t.field({
    type: objects.count,
    args: {
      ids: t.arg({ type: [scalars.uuid], required: false }),
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
