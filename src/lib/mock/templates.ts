import type { InvoiceTemplate } from "@/types/invoice";

export const mockTemplates: InvoiceTemplate[] = [
  {
    id: "template-standard",
    name: { ja: "スタンダード", en: "Standard" },
    description: {
      ja: "シンプルで使いやすい定番テンプレート。あらゆる業種に対応。",
      en: "A clean, versatile template suitable for any industry.",
    },
    preview_color: "#3b82f6",
  },
  {
    id: "template-modern",
    name: { ja: "モダン", en: "Modern" },
    description: {
      ja: "洗練されたデザインでプロフェッショナルな印象を。IT・クリエイティブ業界に最適。",
      en: "Sleek design for a professional look. Perfect for IT and creative industries.",
    },
    preview_color: "#8b5cf6",
  },
  {
    id: "template-minimal",
    name: { ja: "ミニマル", en: "Minimal" },
    description: {
      ja: "必要最低限の情報を美しく配置。コンサルタントや個人事業主に。",
      en: "Beautifully arranged essentials. Ideal for consultants and sole proprietors.",
    },
    preview_color: "#059669",
  },
  {
    id: "template-corporate",
    name: { ja: "コーポレート", en: "Corporate" },
    description: {
      ja: "企業間取引に適したフォーマル なデザイン。信頼感を演出します。",
      en: "Formal design for B2B transactions. Conveys trust and reliability.",
    },
    preview_color: "#1e40af",
  },
];
