import { builder } from "@nutrigym/lib/server/api"
import {
  DateTimeISOResolver,
  DateResolver,
  UUIDResolver,
} from "graphql-scalars"

// NOTE: make sure the graphql codegen 'Scalars' section is updated appropriately
// NOTE: make sure the builder's 'Scalars' section is updated appropriately

const datetimeISO = builder.addScalarType("DateTimeISO", DateTimeISOResolver)
const date = builder.addScalarType("Date", DateResolver)
const uuid = builder.addScalarType("Uuid", UUIDResolver)

export const scalars = {
  datetimeISO,
  uuid,
  date,
}
