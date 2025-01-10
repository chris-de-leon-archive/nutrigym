"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <ClerkProvider>{children}</ClerkProvider>
}
