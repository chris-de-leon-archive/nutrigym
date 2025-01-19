import { env } from "@nutrigym/lib/server/env"
import { schema } from "@nutrigym/lib/schema"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

// TODO: only enable the logger in development
export const db = drizzle<typeof schema>(
  createClient({ url: env.DATABASE_URL }),
  { schema, logger: true },
)
