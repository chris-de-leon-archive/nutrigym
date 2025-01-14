import { InferSelectModel } from "drizzle-orm"
import {
  userMeasurementLog,
  bodyMeasurement,
  foodMeasurement,
  userGoal,
  userBody,
  userFood,
} from "./schema"

export type FoodMeasurement = InferSelectModel<typeof foodMeasurement>
export type BodyMeasurement = InferSelectModel<typeof bodyMeasurement>
export type MeasurementLog = InferSelectModel<typeof userMeasurementLog>
export type Goal = InferSelectModel<typeof userGoal>
export type Body = InferSelectModel<typeof userBody>
export type Food = InferSelectModel<typeof userFood>
