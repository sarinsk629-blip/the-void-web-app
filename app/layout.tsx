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
    google: "_Um8Gl6Th73GEedz0phgvSWY3unRyFl2JTYmG_yKPAE",
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
    generator: 'v0.app'
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
      <head>
        <title>The Void | The Anti-Social Network</title>
        <meta name="google-site-verification" content="_Um8Gl6Th73GEedz0phgvSWY3unRyFl2JTYmG_yKPAE" />
      </head>
      <body className={`${robotoMono.variable} font-mono antialiased bg-black min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
