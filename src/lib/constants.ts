export const PLANS = {
  free: {
    id: "free",
    name: { ja: "フリー", en: "Free" },
    price: 0,
    invoiceLimit: 5,
    hasAi: false,
    hasWatermark: true,
    templateLimit: 1,
    features: {
      ja: [
        "月5枚まで請求書作成",
        "基本テンプレート1種",
        "PDF出力（透かし入り）",
        "請求書管理",
      ],
      en: [
        "Up to 5 invoices/month",
        "1 basic template",
        "PDF export (with watermark)",
        "Invoice management",
      ],
    },
    limitations: {
      ja: ["AI機能なし", "透かし入りPDF", "テンプレート1種のみ"],
      en: ["No AI features", "Watermarked PDFs", "1 template only"],
    },
  },
  pro: {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: 1980,
    invoiceLimit: Infinity,
    hasAi: true,
    hasWatermark: false,
    templateLimit: Infinity,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "",
    features: {
      ja: [
        "無制限の請求書作成",
        "全テンプレート利用可能",
        "AI請求書アシスタント",
        "透かしなしPDF",
        "業種別明細テンプレート",
        "優先サポート",
      ],
      en: [
        "Unlimited invoices",
        "All templates",
        "AI invoice assistant",
        "Watermark-free PDFs",
        "Industry-specific templates",
        "Priority support",
      ],
    },
  },
} as const;

export const TRIAL_DAYS = 14;
export const TAX_RATE = 0.1;
export const APP_NAME = "Smart Invoice";
export const APP_DESCRIPTION = {
  ja: "建設・塗装業のための AI請求書作成ツール。工事名を入力するだけで明細を自動生成。",
  en: "AI-powered invoice generator for construction & painting businesses. Auto-generate line items from project names.",
};
