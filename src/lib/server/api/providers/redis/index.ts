import { env } from "@nutrigym/lib/server/env"
import { scripts } from "./scripts"
import Redis from "ioredis"

export const redis =
  env.CACHE_URL != null
    ? new Redis(env.CACHE_URL, { scripts })
    : new Redis({ scripts })
