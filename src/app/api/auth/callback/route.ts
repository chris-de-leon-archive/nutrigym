import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { schema } from "@nutrigym/lib/server/db/schema"
import { env } from "@nutrigym/lib/server/env"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { isSignedIn, toAuth } = await clerk.authenticateRequest(req, {
    secretKey: env.CLERK_SECRET_KEY,
    jwtKey: env.CLERK_JWT_KEY,
  })

  if (isSignedIn) {
    const { userId } = toAuth()
    await db.transaction(async (tx) => {
      await tx.insert(schema.user).values({ id: userId }).onConflictDoNothing()
    })
  }

  const host = req.headers.get("host")
  const url = new URL(req.url)
  if (host != null) {
    return NextResponse.redirect(new URL(`${url.protocol}//${host}`))
  } else {
    return NextResponse.redirect(new URL(url.origin))
  }
}
