import { clerk } from "@nutrigym/lib/server/providers/clerk"
import { db } from "@nutrigym/lib/server/providers/db"
import { env } from "@nutrigym/lib/server/env"
import { schema } from "@nutrigym/lib/schema"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const auth = await clerk.authenticateRequest(req, {
    jwtKey: env.CLERK_JWT_KEY,
  })

  if (auth.isSignedIn) {
    await db
      .insert(schema.user)
      .values({ id: auth.toAuth().userId })
      .onConflictDoNothing()
  }

  return NextResponse.redirect(new URL("/", req.url))
}
