import { Gender, ServingUnit } from "@nutrigym/lib/enums"
import { sql } from "drizzle-orm"
import {
  sqliteTable,
  integer,
  unique,
  check,
  real,
  text,
} from "drizzle-orm/sqlite-core"

// NOTE: foreign key support is not enabled by default for a local SQLite file - this must
// be explicitly turned on by executing `PRAGMA foreign_keys = ON;` whenever a new DB sess
// is created. See links below for more info:
//   - https://github.com/drizzle-team/drizzle-orm/issues/2565#issuecomment-2299403199
//   - https://stackoverflow.com/a/5901100
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

// NOTE: the `birthday` is stored as a timezone agnostic date string of the form YYYY-MM-DD.
// If we instead stored a timezone-aware UTC date string, then this could lead to off-by-one
// issues with the date. For example, if the user was born on 1998-12-03 in Tokyo, then this
// could be stored as 1998-12-02 (UTC) in the DB causing the date to be rendered incorrectly
// on the frontend. To resolve this, the API layer will carefully avoid any type of timezone
// adjustments on the input date string (e.g. https://stackoverflow.com/a/52352512). The date
// string will only be validated then stored it as-is in the DB. When the API returns a date
// string back to the client, they can parse out the year, month, and day then pass them all
// as usual to the Date constructor as the local year, month, and day. This will ensure that
// the date is always the same regardless of the local timezone. This method is also used in
// other tables as well.
export const userBody = sqliteTable(
  "user_body",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    birthday: text("birthday").notNull(),
    gender: text("gender").$type<Gender>().notNull(),
  },
  (t) => [
    check(
      "valid_gender",
      sql`${t.gender} IN (${sql.join(
        Object.values(Gender).map((g) => sql.raw("'" + g + "'")),
        sql`,`,
      )})`,
    ),
  ],
)

// NOTE: we'll validate that the percentages sum to exactly 100 at the API layer that way we can
// avoid introducing extra complications with floating point comparison in the check constraint
export const userGoal = sqliteTable(
  "user_goal",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    waterInMilliliters: real("water_in_milliliters").notNull(),
    weightInPounds: real("weight_in_pounds").notNull(),
    sleepInHours: real("sleep_in_hours").notNull(),
    proteinPercentage: real("protein_percentage").notNull(),
    carbsPercentage: real("carbs_percentage").notNull(),
    fatPercentage: real("fat_percentage").notNull(),
    calories: real("calories").notNull(),
    steps: integer("steps").notNull(),
    date: text("date").notNull(),
  },
  (t) => [
    unique().on(t.userId, t.date),
    check("nonnegative_water_ml", sql`${t.waterInMilliliters} >= 0`),
    check("nonnegative_calories", sql`${t.calories} >= 0`),
    check("nonnegative_weight", sql`${t.weightInPounds} >= 0`),
    check("nonnegative_steps", sql`${t.steps} >= 0`),
    check("valid_sleep_hrs", sql`${t.sleepInHours} BETWEEN 0 AND 24`),
    check(
      "valid_protein_percentage_range",
      sql`${t.proteinPercentage} BETWEEN 0 AND 100`,
    ),
    check(
      "valid_carbs_percentage_range",
      sql`${t.carbsPercentage} BETWEEN 0 AND 100`,
    ),
    check(
      "valid_fat_percentage_range",
      sql`${t.fatPercentage} BETWEEN 0 AND 100`,
    ),
  ],
)

export const userFood = sqliteTable(
  "user_food",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    calories: real("calories").notNull(),
    servingSize: real("serving_size").notNull(),
    servingUnit: text("serving_unit").$type<ServingUnit>().notNull(),
    totalProteinInGrams: real("total_protein_in_grams"),
    totalCarbsInGrams: real("total_carbs_in_grams"),
    totalFatInGrams: real("total_fat_in_grams"),
    polyunsaturatedFatInGrams: real("polyunsaturated_fat_in_grams"),
    monounsaturatedFatInGrams: real("monounsaturated_fat_in_grams"),
    saturatedFatInGrams: real("saturated_fat_in_grams"),
    potassiumInMilligrams: real("potassium_in_milligrams"),
    sodiumInMilligrams: real("sodium_in_milligrams"),
    dietaryFiberInGrams: real("dietary_fiber_in_grams"),
    sugarsInGrams: real("sugars_in_grams"),
    cholesterolInMilligrams: real("cholesterol_in_milligrams"),
    calciumInMilligrams: real("calcium_in_milligrams"),
    ironInMilligrams: real("iron_in_milligrams"),
  },
  (t) => [
    unique().on(t.userId, t.name, t.brand),
    check("nonnegative_calories", sql`${t.calories} >= 0`),
    check("nonnegative_serving_size", sql`${t.servingSize} >= 0`),
    check("nonnegative_total_protein", sql`${t.totalProteinInGrams} >= 0`),
    check("nonnegative_total_carbs", sql`${t.totalCarbsInGrams} >= 0`),
    check("nonnegative_total_fat", sql`${t.totalFatInGrams} >= 0`),
    check(
      "nonnegative_polyunsaturated_fat",
      sql`${t.polyunsaturatedFatInGrams} >= 0`,
    ),
    check(
      "nonnegative_monounsaturated_fat",
      sql`${t.monounsaturatedFatInGrams} >= 0`,
    ),
    check("nonnegative_saturated_fat", sql`${t.saturatedFatInGrams} >= 0`),
    check("nonnegative_potassium", sql`${t.potassiumInMilligrams} >= 0`),
    check("nonnegative_sodium", sql`${t.sodiumInMilligrams} >= 0`),
    check("nonnegative_dietary_fiber", sql`${t.dietaryFiberInGrams} >= 0`),
    check("nonnegative_sugars", sql`${t.sugarsInGrams} >= 0`),
    check("nonnegative_cholesterol", sql`${t.cholesterolInMilligrams} >= 0`),
    check("nonnegative_calcium", sql`${t.calciumInMilligrams} >= 0`),
    check("nonnegative_iron", sql`${t.ironInMilligrams} >= 0`),
    check(
      "valid_serving_unit",
      sql`${t.servingUnit} IN (${sql.join(
        Object.values(ServingUnit).map((g) => sql.raw("'" + g + "'")),
        sql`,`,
      )})`,
    ),
  ],
)

export const userMeasurementLog = sqliteTable(
  "user_measurement_log",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
  },
  (t) => [unique().on(t.userId, t.date)],
)

// TODO: what should happen to a food measurement if a user deletes the food that it is referencing?
// TODO: need a separate field to track when the food was eaten
export const foodMeasurement = sqliteTable(
  "food_measurement",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    logId: text("log_id")
      .notNull()
      .references(() => userMeasurementLog.id, { onDelete: "cascade" }),
    foodId: text("food_id")
      .notNull()
      .references(() => userFood.id),
    servingsConsumed: real("servings_consumed").notNull(),
  },
  (t) => [
    check("nonnegative_servings_consumed", sql`${t.servingsConsumed} >= 0`),
  ],
)

// TODO: need a separate field to track when the measurement was taken?
export const bodyMeasurement = sqliteTable(
  "body_measurement",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    logId: text("log_id")
      .notNull()
      .unique()
      .references(() => userMeasurementLog.id, { onDelete: "cascade" }),
    weightInPounds: real("weight_in_pounds").notNull(),
    heightInInches: real("height_in_inches").notNull(),
    waterInMilliliters: real("water_in_milliliters"),
    shouldersInInches: real("shoulders_in_inches"),
    forearmsInInches: real("forearms_in_inches"),
    calvesInInches: real("calves_in_inches"),
    thighsInInches: real("thighs_in_inches"),
    waistInInches: real("waist_in_inches"),
    chestInInches: real("chest_in_inches"),
    armsInInches: real("arms_in_inches"),
    neckInInches: real("neck_in_inches"),
    hipsInInches: real("hips_in_inches"),
    sleepInHours: real("sleep_in_hours"),
    steps: integer("steps"),
  },
  (t) => [
    check("valid_sleep_hrs", sql`${t.sleepInHours} BETWEEN 0 AND 24`),
    check("nonnegative_weight", sql`${t.weightInPounds} >= 0`),
    check("nonnegative_height", sql`${t.heightInInches} >= 0`),
    check("nonnegative_water", sql`${t.waterInMilliliters} >= 0`),
    check("nonnegative_shoulders", sql`${t.shouldersInInches} >= 0`),
    check("nonnegative_forearms", sql`${t.forearmsInInches} >= 0`),
    check("nonnegative_calves", sql`${t.calvesInInches} >= 0`),
    check("nonnegative_thighs", sql`${t.thighsInInches} >= 0`),
    check("nonnegative_waist", sql`${t.waistInInches} >= 0`),
    check("nonnegative_chest", sql`${t.chestInInches} >= 0`),
    check("nonnegative_arms", sql`${t.armsInInches} >= 0`),
    check("nonnegative_neck", sql`${t.neckInInches} >= 0`),
    check("nonnegative_hips", sql`${t.hipsInInches} >= 0`),
    check("nonnegative_steps", sql`${t.steps} >= 0`),
  ],
)

export const photoMeasurement = sqliteTable("photo_measurement", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  logId: text("log_id")
    .notNull()
    .references(() => userMeasurementLog.id, { onDelete: "cascade" }),
  url: text("url"),
})

// TODO:

// export const loggedWorkout = sqliteTable("logged_workout", {
//   id: text("id").primaryKey(),
//   createdAt: integer("created_at").notNull().default(sql`(current_timestamp)`),
//   startTimeMs: integer("start_time_ms", { mode: "timestamp_ms" }).notNull(),
//   endTimeMs: integer("end_time_ms", { mode: "timestamp_ms" }).notNull(),
//   userId: text("user_id").notNull().references(() => user.id),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   month: integer("month").notNull(),
//   year: integer("year").notNull(),
//   day: integer("day").notNull(),
// });
//
// export const loggedExercise = sqliteTable("logged_exercise", {
//   id: text("id").primaryKey(),
//   workoutId: text("workout_id").notNull().references(() => loggedWorkout.id),
//   restDurationMs: integer("rest_duration_ms").notNull(),
//   startTimeMs: integer("start_time_ms", { mode: "timestamp_ms" }).notNull(),
//   endTimeMs: integer("end_time_ms", { mode: "timestamp_ms" }).notNull(),
//   position: integer("position").notNull(),
// });
//
// export const loggedSet = sqliteTable("logged_set", {
//   id: text("id").primaryKey(),
//   exerciseId: text("exercise_id").notNull().references(() => loggedExercise.id),
//   startTimeMs: integer("start_time_ms", { mode: "timestamp_ms" }).notNull(),
//   endTimeMs: integer("end_time_ms", { mode: "timestamp_ms" }).notNull(),
//   position: integer("position").notNull(),
//   reps: integer("reps").notNull(),
//   lbs: real("lbs").notNull(),
// }, (t) => [
//   unique().on(t.exerciseId, t.position),
// ]);
//
// export const userWorkout = sqliteTable("user_workout", {
//   id: text("id").primaryKey(),
//   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
//   userId: text("user_id").notNull().references(() => user.id),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
// }, (t) => [
//   unique().on(t.id, t.userId),
// ]);
//
// export const userExercise = sqliteTable("user_exercise", {
//   id: text("id").primaryKey(),
//   userWorkoutId: text("user_workout_id").notNull().references(() =>
//     userWorkout.id
//   ),
//   exerciseId: text("exercise_id").notNull().references(() => exercise.id),
//   restDurationMs: integer("rest_duration_ms").notNull(),
//   setCount: integer("set_count").notNull(),
//   repCount: integer("rep_count").notNull(),
//   position: integer("position").notNull(),
// }, (t) => [
//   unique().on(t.userWorkoutId, t.position),
// ]);
//
// export const exercise = sqliteTable("exercise", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   imageUrl: text("image_url"),
//   videoUrl: text("video_url"),
// });
//
// export const exerciseToMuscle = sqliteTable("exercise_to_muscle", {
//   exerciseId: text("exercise_id").notNull().references(() => exercise.id),
//   muscleId: text("muscle_id").notNull().references(() => muscle.id),
// }, (t) => [
//   primaryKey({ columns: [t.exerciseId, t.muscleId] }),
// ]);
//
// export const muscle = sqliteTable("muscle", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   imageUrl: text("image_url"),
// });
