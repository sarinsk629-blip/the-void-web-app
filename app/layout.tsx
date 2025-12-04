import type React from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "The Void | The Anti-Social Network",
  description: "Find your soulmate through trauma, not selfies. An AI experiment powered by Gemini 3 Pro.",
  keywords: ["soul connection", "anti-social media", "authentic connection", "digital revolution", "AI soulmate"],
  verification: {
    google: "ettceV2fs9TnQV7bqXvT03Q1FFH9pNu2BxqjUDwKDMc",
  },
  openGraph: {
    title: "The Void | The Anti-Social Network",
    description: "Find your soulmate through trauma, not selfies. An AI experiment powered by Gemini 3 Pro.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Void | The Anti-Social Network",
    description: "Find your soulmate through trauma, not selfies. An AI experiment powered by Gemini 3 Pro.",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${robotoMono.variable} font-mono antialiased bg-black min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
