import { sql } from "drizzle-orm";

export const CurrentMsTimestamp = sql`(unixepoch() * 1000)`
export const NULL = sql`NULL`
