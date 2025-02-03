import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "bodyStats"

builder.queryField(name, (t) =>
  t.field({
    type: types.objects.statistic,
    args: {
      date: t.arg({
        type: types.inputs.inclusiveDateRangeInput,
        required: true,
      }),
    },
    validate: {
      schema: resolver.input,
    },
    resolve: async (_, args, ctx) => {
      return await requireAuth(ctx, async (auth) => {
        return await resolver.handler(args, auth)
      })
    },
  }),
)

export const schema = defineOperationSchema({
  name,
  input: undefined,
})
