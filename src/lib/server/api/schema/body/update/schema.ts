import { scalars } from "../../scalars"
import { resolver } from "./resolver"
import { enums } from "../../enums"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "updateBody"

const input = builder.inputType("UpdateBodyInput", {
  fields: (t) => ({
    birthday: t.field({ type: scalars.localdate, required: false }),
    gender: t.field({ type: enums.gender, required: false }),
  }),
})

builder.mutationField(name, (t) =>
  t.field({
    type: [types.objects.body],
    args: {
      data: t.arg({ type: input, required: true }),
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
  input,
})
