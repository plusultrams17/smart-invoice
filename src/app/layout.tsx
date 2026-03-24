import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-invoice-sage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smart Invoice - 建設・塗装業向けAI請求書作成ツール",
    template: "%s | Smart Invoice",
  },
  description:
    "建設・塗装業のためのAI請求書作成ツール。工事名を入力するだけで明細を自動生成。インボイス制度対応・PDF出力・顧客管理をこれ1つで。14日間無料トライアル。",
  keywords: [
    "請求書作成",
    "AI請求書",
    "建設業 請求書",
    "塗装業 請求書",
    "インボイス制度",
    "請求書ソフト",
    "フリーランス 請求書",
    "請求書管理",
    "PDF請求書",
    "invoice generator",
    "construction invoice",
  ],
  authors: [{ name: "HAKUSO" }],
  creator: "HAKUSO",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Smart Invoice",
    title: "Smart Invoice - 建設・塗装業向けAI請求書作成ツール",
    description:
      "工事名を入力するだけで請求書が完成。AI自動生成×インボイス制度対応で、請求業務を87%時短。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Invoice - AI請求書作成ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Invoice - 建設・塗装業向けAI請求書作成ツール",
    description:
      "工事名を入力するだけで請求書が完成。AI自動生成×インボイス制度対応。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      ja: siteUrl,
      en: `${siteUrl}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
