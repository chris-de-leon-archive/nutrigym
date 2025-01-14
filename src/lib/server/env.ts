import { z } from "zod"

export const env = z
  .object({
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_JWT_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
  })
  .parse(process.env)
