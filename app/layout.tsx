import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Mharmyraux | The End of Loneliness",
  description:
    "A revolutionary social ecosystem where souls collide. The Void heals. The Pulse connects. The Zenith ignites. Welcome home.",
  keywords: ["social network", "connection", "AI", "chat", "community", "belonging", "healing", "Mharmyraux"],
  verification: {
    google: "ettceV2fs9TnQV7bqXvT03Q1FFH9pNu2BxqjUDwKDMc",
  },
  openGraph: {
    title: "Mharmyraux | The End of Loneliness",
    description: "A revolutionary social ecosystem where souls collide. Welcome home.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mharmyraux | The End of Loneliness",
    description: "A revolutionary social ecosystem where souls collide. Welcome home.",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
