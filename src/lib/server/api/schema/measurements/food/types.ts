import { FoodMeasurement, schema } from "@nutrigym/lib/server/db/schema"
import { builder, defineTypes } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"
import { inArray } from "drizzle-orm"
import { enums } from "../../enums"
import { foods } from "../../food"

const foodMeasurement = builder.objectRef<FoodMeasurement>("FoodMeasurement")

builder.objectType(foodMeasurement, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.datetimeISO }),
    logId: t.exposeString("logId"),
    foodId: t.exposeString("foodId"),
    servingsConsumed: t.exposeFloat("servingsConsumed"),
    mealType: t.expose("mealType", { type: enums.mealType }),
  }),
})

// NOTE: if a food gets updated/removed, then all food measurements that reference
// the modified food will automatically be invalidated by the response cache plugin
//
// NOTE: if a new food is created, then we only need to invalidate all foods. It is
// not necessary to invalidate food measurements
builder.objectField(foodMeasurement, "food", (t) =>
  t.loadable({
    type: foods.types.objects.food,
    sort: (elem) => elem.id,
    load: async (ids: string[], ctx) => {
      return await ctx.providers.db.query.userFood.findMany({
        where: inArray(schema.userFood.id, ids),
      })
    },
    resolve: (parent) => {
      return parent.foodId
    },
  }),
)

export const types = defineTypes({
  inputs: {},
  objects: {
    foodMeasurement,
  },
})
