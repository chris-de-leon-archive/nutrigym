import { builder } from "@nutrigym/lib/server/api"

// These imports will register all the resolvers, objects, inputs, etc. to the builder
import "./measurements/food/schema"
import "./measurements/body/schema"
import "./analytics/schema"
import "./food/schema"
import "./goal/schema"
import "./body/schema"

export const schema = builder.toSchema()
