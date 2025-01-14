import { FoodMeasurement } from "@nutrigym/lib/schema";
import { builder } from "@nutrigym/lib/server/api";
import { scalars } from "../../scalars";

const foodMeasurement = builder.objectRef<FoodMeasurement>("FoodMeasurement");

builder.objectType(foodMeasurement, {
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: scalars.date }),
    logId: t.exposeString("logId"),
    foodId: t.exposeString("foodId"),
    servingsConsumed: t.exposeFloat("servingsConsumed"),
  }),
});

export const types = {
  foodMeasurement,
};
