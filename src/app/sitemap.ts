import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-invoice-sage.vercel.app";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ja: siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/legal/terms`,
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/legal/privacy`,
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/legal/tokushoho`,
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
