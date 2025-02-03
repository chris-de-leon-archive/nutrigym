import { scalars } from "../../scalars"
import { resolver } from "./resolver"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "goalByClosestDate"

builder.queryField(name, (t) =>
  t.field({
    type: types.objects.goal,
    nullable: true,
    args: {
      date: t.arg({ type: scalars.localdate, required: true }),
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
