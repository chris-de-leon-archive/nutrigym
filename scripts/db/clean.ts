import * as fs from "node:fs"
import { z } from "zod"

const zLocalDatabaseFile = z
  .string()
  .startsWith("file:")
  .endsWith(".db")
  .transform((s) => s.replace(/^file:/, ""))

fs.rmSync(
  z
    .object({ DATABASE_URL: zLocalDatabaseFile })
    .transform(({ DATABASE_URL }) => DATABASE_URL)
    .parse(process.env),
)
