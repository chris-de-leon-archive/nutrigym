import { DateTimeISOResolver, UUIDResolver } from "graphql-scalars"
import { builder } from "@nutrigym/lib/server/api"

// NOTE: make sure the graphql codegen 'Scalars' section is updated appropriately
// NOTE: make sure the builder's 'Scalars' section is updated appropriately

const date = builder.addScalarType("Date", DateTimeISOResolver)
const uuid = builder.addScalarType("Uuid", UUIDResolver)

export const scalars = {
  uuid,
  date,
}
