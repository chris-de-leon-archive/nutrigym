import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../scalars"

const dateDataPoint = builder.objectRef<{
  date: string
  value: number | null
}>("DateDataPoint")

builder.objectType(dateDataPoint, {
  fields: (t) => ({
    date: t.expose("date", { type: scalars.localdate }),
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
  dateDataPoint,
}
