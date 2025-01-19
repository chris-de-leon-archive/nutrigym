import { Gender } from "@nutrigym/lib/enums"
import { sql } from "drizzle-orm"
import {
  sqliteTable,
  integer,
  unique,
  check,
  index,
  real,
  text,
} from "drizzle-orm/sqlite-core"

// TODO: add cascading user deletion

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

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
      .references(() => user.id),
    birthday: integer("birthday", { mode: "timestamp_ms" }).notNull(),
    gender: text("gender").$type<Gender>().notNull(),
  },
  () => [
    check(
      "valid_gender",
      sql`gender IN (${sql.join(
        Object.values(Gender).map((g) => sql.raw("'" + g + "'")),
        sql`,`,
      )})`,
    ),
  ],
)

// TODO: should we add a DB trigger that automatically sets new versions to latest?
export const userGoal = sqliteTable(
  "user_goal",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    waterInMilliliters: real("water_in_milliliters").notNull(),
    weightInPounds: real("weight_in_pounds").notNull(),
    sleepInHours: real("sleep_in_hours").notNull(),
    proteinPercentage: real("protein_percentage").notNull(),
    carbsPercentage: real("carbs_percentage").notNull(),
    fatPercentage: real("fat_percentage").notNull(),
    calories: real("calories").notNull(),
    steps: integer("steps").notNull(),
    version: text("version").notNull(),
    latest: integer("latest", { mode: "boolean" }).notNull(),
  },
  (t) => [
    unique().on(t.userId, t.version),
    index("no_more_than_one_latest_version_per_user")
      .on(t.userId)
      .where(sql`latest = 1`),
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
      .references(() => user.id),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    calories: real("calories").notNull(),
    servingSize: real("serving_size").notNull(),
    servingUnit: text("serving_unit").notNull(),
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
  (t) => [unique().on(t.userId, t.name, t.brand)],
)

export const userMeasurementLog = sqliteTable(
  "user_measurement_log",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    goalId: text("goal_id")
      .notNull()
      .references(() => userGoal.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    day: integer("day").notNull(),
  },
  (t) => [unique().on(t.userId, t.year, t.month, t.day)],
)

export const foodMeasurement = sqliteTable("food_measurement", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  logId: text("log_id")
    .notNull()
    .references(() => userMeasurementLog.id),
  foodId: text("food_id")
    .notNull()
    .references(() => userFood.id),
  servingsConsumed: real("servings_consumed").notNull(),
})

export const bodyMeasurement = sqliteTable("body_measurement", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  logId: text("log_id")
    .notNull()
    .unique()
    .references(() => userMeasurementLog.id),
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
})

export const photoMeasurement = sqliteTable("photo_measurement", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  logId: text("log_id")
    .notNull()
    .references(() => userMeasurementLog.id),
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
