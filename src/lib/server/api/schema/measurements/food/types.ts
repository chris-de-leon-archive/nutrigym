import { FoodMeasurement, schema } from "@nutrigym/lib/server/db/schema"
import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"
import { inArray } from "drizzle-orm"
import { foods } from "../../food"

const foodMeasurement = builder.objectRef<FoodMeasurement>("FoodMeasurement")

builder.objectType(foodMeasurement, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.datetimeISO }),
    logId: t.exposeString("logId"),
    foodId: t.exposeString("foodId"),
    servingsConsumed: t.exposeFloat("servingsConsumed"),
  }),
})

// TODO: if a food gets created/updated/removed, then all food measurements should be invalidated
builder.objectField(foodMeasurement, "food", (t) =>
  t.loadable({
    type: foods.types.food,
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

export const types = {
  foodMeasurement,
}
