import { builder } from "@nutrigym/lib/server/api"
import {
  DateTimeISOResolver,
  LocalDateResolver,
  UUIDResolver,
} from "graphql-scalars"

// NOTE: make sure the graphql codegen 'Scalars' section is updated appropriately
// NOTE: make sure the builder's 'Scalars' section is updated appropriately

const datetimeISO = builder.addScalarType("DateTimeISO", DateTimeISOResolver)
const localdate = builder.addScalarType("LocalDate", LocalDateResolver)
const uuid = builder.addScalarType("Uuid", UUIDResolver)

export const scalars = {
  datetimeISO,
  localdate,
  uuid,
}
