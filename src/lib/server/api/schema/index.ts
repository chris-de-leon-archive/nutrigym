// These imports will register all the resolvers, objects, inputs, etc. to the builder
import "./measurements/food/schema"
import "./measurements/body/schema"
import "./measurements/log/schema"
import "./food/schema"
import "./goal/schema"
import "./body/schema"

// At this point all the schema info will be registered to the builder
import { builder } from "@nutrigym/lib/server/api"

// Now that the builder has all the info, we can export the populated schema
export const schema = builder.toSchema()
