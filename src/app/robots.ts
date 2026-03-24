import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-invoice-sage.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/invoices/", "/settings/", "/templates/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
