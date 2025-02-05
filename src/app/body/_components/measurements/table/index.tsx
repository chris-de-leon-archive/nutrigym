import { BodyMeasurement } from "@nutrigym/lib/client/graphql"
import { BodyMeasurementsTable } from "./table"

export type BodyMeasurementsProps = {
  measurement: BodyMeasurement | null | undefined
}

export function BodyMeasurements(props: BodyMeasurementsProps) {
  return <BodyMeasurementsTable {...props} />
}
