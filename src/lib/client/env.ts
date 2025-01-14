import { z } from "zod"

export const env = {
  NEXT_PUBLIC_API_URL: z
    .string()
    .url()
    .parse(process.env["NEXT_PUBLIC_API_URL"]),
}
