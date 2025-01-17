import DataloaderPlugin from "@pothos/plugin-dataloader"
import { GraphQLBaseContext } from "./types"
import ZodPlugin from "@pothos/plugin-zod"
import SchemaBuilder from "@pothos/core"
import { errors } from "./errors"

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: false
  Context: GraphQLBaseContext
  Scalars: {
    Uuid: {
      Input: string
      Output: string
    }
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  defaultFieldNullability: false,
  plugins: [ZodPlugin, DataloaderPlugin],
  zod: {
    validationError: (err) => {
      return errors.BadRequest(err.errors.at(0)?.message ?? err.message)
    },
  },
})

builder.mutationType({})
builder.queryType({})
