import { environment } from "@nutrigym/lib/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/server/db/schema/schema.ts",
  dbCredentials: {
    url: environment().getOrThrow("DATABASE_URL"),
  },
  dialect: "turso",
  verbose: true,
})
