import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../scalars"

const statistic = builder.objectRef<{
  key: string
  value: number | null
}>("Statistic")

builder.objectType(statistic, {
  fields: (t) => ({
    key: t.exposeString("key", { nullable: false }),
    value: t.exposeFloat("value", { nullable: true }),
  }),
})

const inclusiveDateRangeInput = builder.inputType("InclusiveDateRangeInput", {
  fields: (t) => ({
    start: t.field({
      type: scalars.localdate,
      required: true,
      description: "inclusive start date",
    }),
    final: t.field({
      type: scalars.localdate,
      required: true,
      description: "inclusive end date",
    }),
  }),
})

const rollingAverageInput = builder.inputType("RollingAverageInput", {
  fields: (t) => ({
    window: t.float({ required: true, description: "window size" }),
  }),
})

const transformationOptionsInput = builder.inputType(
  "TransformationOptionsInput",
  {
    fields: (t) => ({
      rollingAverage: t.field({
        type: rollingAverageInput,
        required: false,
      }),
    }),
  },
)

export const types = {
  transformationOptionsInput,
  inclusiveDateRangeInput,
  rollingAverageInput,
  statistic,
}
