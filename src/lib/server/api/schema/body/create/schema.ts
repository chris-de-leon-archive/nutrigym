import { scalars } from "../../scalars"
import { resolver } from "./resolver"
import { enums } from "../../enums"
import { types } from "../types"
import {
  defineOperationSchema,
  requireAuth,
  builder,
} from "@nutrigym/lib/server/api"

const name = "createBody"

const input = builder.inputType("CreateBodyInput", {
  fields: (t) => ({
    birthday: t.field({ type: scalars.localdate, required: true }),
    gender: t.field({ type: enums.gender, required: true }),
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
