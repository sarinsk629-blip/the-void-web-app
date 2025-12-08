import type { MetadataSite } from "next"

export default function sitemap(): MetadataSite[] {
  return [
    {
      url: "https://the-void-web-app.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]
}
