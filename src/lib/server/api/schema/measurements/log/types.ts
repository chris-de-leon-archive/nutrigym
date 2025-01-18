import { MeasurementLog, schema } from "@nutrigym/lib/schema"
import { builder } from "@nutrigym/lib/server/api"
import { foodMeasurements } from "../food"
import { bodyMeasurements } from "../body"
import { scalars } from "../../scalars"
import { inArray } from "drizzle-orm"

const measurementLog = builder.objectRef<MeasurementLog>("MeasurementLog")

builder.objectType(measurementLog, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.date }),
    goalId: t.exposeString("goalId"),
    userId: t.exposeString("userId"),
    month: t.exposeInt("month"),
    year: t.exposeInt("year"),
    day: t.exposeInt("day"),
  }),
})

builder.objectField(measurementLog, "foodMeasurements", (t) =>
  t.loadableGroup({
    type: foodMeasurements.types.foodMeasurement,
    group: (measurement) => measurement.logId,
    load: async (ids: string[], ctx) => {
      return await ctx.providers.db.query.foodMeasurement.findMany({
        where: inArray(schema.foodMeasurement.logId, ids),
      })
    },
    resolve: (parent) => {
      return parent.id
    },
  }),
)

builder.objectField(measurementLog, "bodyMeasurement", (t) =>
  t.loadable({
    type: bodyMeasurements.types.bodyMeasurement,
    nullable: true,
    sort: (measurement) => measurement.logId,
    load: async (ids: string[], ctx) => {
      return await ctx.providers.db.query.bodyMeasurement.findMany({
        where: inArray(schema.bodyMeasurement.logId, ids),
      })
    },
    resolve: (parent) => {
      return parent.id
    },
  }),
)

export const types = {
  measurementLog,
}
