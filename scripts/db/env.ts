import { randomUUID } from "node:crypto"
import { z } from "zod"

export const env = z
  .object({
    DATABASE_URL: z.string().startsWith("file:").endsWith(".db"),
    CLERK_USER_ID: z.string().default(randomUUID()),
  })
  .parse(process.env)
