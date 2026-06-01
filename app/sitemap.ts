import type { MetadataRoute } from "next"

const BASE = "https://getkairo.lat"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/politica-de-privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terminos-y-condiciones`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]
}
