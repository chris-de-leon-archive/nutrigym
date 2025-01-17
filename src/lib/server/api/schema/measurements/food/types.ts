import { FoodMeasurement, schema } from "@nutrigym/lib/schema"
import { builder } from "@nutrigym/lib/server/api"
import { scalars } from "../../scalars"
import { inArray } from "drizzle-orm"
import { food } from "../../food"

const foodMeasurement = builder.objectRef<FoodMeasurement>("FoodMeasurement")

builder.objectType(foodMeasurement, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.date }),
    logId: t.exposeString("logId"),
    foodId: t.exposeString("foodId"),
    servingsConsumed: t.exposeFloat("servingsConsumed"),
  }),
})

builder.objectField(foodMeasurement, "food", (t) =>
  t.loadable({
    type: food.types.food,
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
