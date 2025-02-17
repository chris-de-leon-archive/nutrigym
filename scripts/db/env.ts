import { environment } from "@nutrigym/lib/env"
import { randomUUID } from "node:crypto"
import { z } from "zod"

console.log(environment().entries())

export const env = z
  .object({
    CLERK_USER_ID: z.string().default(randomUUID()),
    DATABASE_URL: z.string(),
  })
  .parse(environment().entries())
