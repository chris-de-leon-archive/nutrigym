import TracingPlugin, { isRootField, runFunction } from "@pothos/plugin-tracing"
import { tracer } from "@nutrigym/lib/server/api/providers/tracer"
import DataloaderPlugin from "@pothos/plugin-dataloader"
import ZodPlugin from "@pothos/plugin-zod"
import SchemaBuilder from "@pothos/core"
import { BuilderContext } from "./types"
import { errors } from "./errors"

export const builder = new SchemaBuilder<BuilderContext>({
  defaultFieldNullability: false,
  plugins: [TracingPlugin, ZodPlugin, DataloaderPlugin],
  zod: {
    validationError: (err) => {
      return errors.BadRequest(err.issues.at(0)?.message ?? err.message)
    },
  },
  tracing: {
    // TODO: decide whether or not we need the tracing plugin
    default: (c) => isRootField(c),
    wrap: (resolver, opts, field) => {
      return (source, args, ctx, info) => {
        return runFunction(
          () => resolver(source, args, ctx, info),
          (err, dur) => {
            tracer.record(ctx.yoga.request, {
              field,
              opts,
              info,
              err,
              dur,
            })
          },
        )
      }
    },
  },
})

builder.mutationType({})
builder.queryType({})
