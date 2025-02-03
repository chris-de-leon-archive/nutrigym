import { builder, defineTypes } from "@nutrigym/lib/server/api"
import { scalars } from "../scalars"

type DataPoint = {
  key: string
  value: number
}

type Statistic = {
  id: string
  data: DataPoint[]
}

// TODO: this does not have an ID field - will it still be cached? If so, how?
const datapoint = builder.objectRef<DataPoint>("DataPoint")
builder.objectType(datapoint, {
  fields: (t) => ({
    key: t.exposeString("key", { nullable: false }),
    value: t.exposeFloat("value", { nullable: true }),
  }),
})

const statistic = builder.objectRef<Statistic>("Statistic")
builder.objectType(statistic, {
  fields: (t) => ({
    id: t.exposeString("id", { nullable: false }),
    data: t.expose("data", { type: [datapoint], nullable: false }),
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

export const types = defineTypes({
  inputs: {
    transformationOptionsInput,
    inclusiveDateRangeInput,
    rollingAverageInput,
  },
  objects: {
    statistic,
    datapoint,
  },
})
