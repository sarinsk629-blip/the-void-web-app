import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://the-void-web-app.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://the-void-web-app.vercel.app/#void",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://the-void-web-app.vercel.app/#pulse",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://the-void-web-app.vercel.app/#zenith",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]
}
