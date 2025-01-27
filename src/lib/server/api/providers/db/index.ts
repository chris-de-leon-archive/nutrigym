import { env } from "@nutrigym/lib/server/env"
import { schema } from "@nutrigym/lib/server/db/schema"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

export const db = drizzle<typeof schema>(
  createClient({ url: env.DATABASE_URL }),
  { schema, logger: env.IS_DEV_MODE },
)
