import { createClerkClient } from "@clerk/backend"
import { env } from "@nutrigym/lib/server/env"

export const clerk = createClerkClient({
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
})
