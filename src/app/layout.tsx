import "./globals.css"

import { SignedIn, SignedOut, SignUp } from "@clerk/nextjs"
import { ThemeProvider } from "@nutrigym/components/theme"
import { Header } from "@nutrigym/components/header"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NutriGym",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <SignedOut>
            <SignUp />
          </SignedOut>
          <SignedIn>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main>
                <section className="section min-h-screen">{children}</section>
              </main>
            </ThemeProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}
