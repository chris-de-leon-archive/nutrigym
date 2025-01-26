import "./globals.css"

import { SignedIn, SignedOut, SignUp } from "@clerk/nextjs"
import { Header } from "@nutrigym/components/header"
import type { Metadata } from "next"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "NutriGym",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <SignedOut>
            <SignUp />
          </SignedOut>
          <SignedIn>
            <Header />
            <main>
              <section className="section min-h-screen">{children}</section>
            </main>
          </SignedIn>
        </body>
      </html>
    </Providers>
  )
}
