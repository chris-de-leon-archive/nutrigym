import { DateResolver, UUIDResolver } from "graphql-scalars"
import { builder } from "@nutrigym/lib/server/api"

// NOTE: make sure the builder's 'Scalars' section is updated appropriately
//
const date = builder.addScalarType("Date", DateResolver)
const uuid = builder.addScalarType("Uuid", UUIDResolver)

export const scalars = {
  uuid,
  date,
}
