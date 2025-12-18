import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Vibe | AI Social Chat",
  description: "Connect with AI companions and meet new people. The future of social interaction.",
  keywords: ["AI chat", "social network", "AI companion", "meet people", "chat app", "social AI"],
  verification: {
    google: "ettceV2fs9TnQV7bqXvT03Q1FFH9pNu2BxqjUDwKDMc",
  },
  openGraph: {
    title: "Vibe | AI Social Chat",
    description: "Connect with AI companions and meet new people. The future of social interaction.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe | AI Social Chat",
    description: "Connect with AI companions and meet new people. The future of social interaction.",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0f0a1a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
