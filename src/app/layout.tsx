import "./globals.css"

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
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>
            <section className="section min-h-screen">{children}</section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
