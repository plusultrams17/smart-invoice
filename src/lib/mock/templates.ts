import type { InvoiceTemplate } from "@/types/invoice";

export const mockTemplates: InvoiceTemplate[] = [
  {
    id: "template-standard",
    name: { ja: "スタンダード", en: "Standard" },
    description: {
      ja: "シンプルで見やすい標準テンプレート。塗装・建設業の日常的な請求に。",
      en: "Clean standard template for everyday construction & painting invoices.",
    },
    preview_color: "#3b82f6",
  },
  {
    id: "template-construction",
    name: { ja: "工事請求書", en: "Construction Invoice" },
    description: {
      ja: "建設・塗装工事に最適化。工事明細・材料費・人件費を分かりやすく表示。インボイス制度完全対応。",
      en: "Optimized for construction & painting work. Clear breakdown of labor, materials, and project details.",
    },
    preview_color: "#f59e0b",
  },
  {
    id: "template-estimate",
    name: { ja: "工事見積書", en: "Work Estimate" },
    description: {
      ja: "見積段階で使えるテンプレート。承認欄付きでそのまま発注書としても利用可能。",
      en: "Estimate template with approval section. Can double as a work order.",
    },
    preview_color: "#059669",
  },
  {
    id: "template-corporate",
    name: { ja: "法人向けフォーマル", en: "Corporate Formal" },
    description: {
      ja: "大手ゼネコン・管理会社向けのフォーマルなデザイン。信頼感のある堅実なレイアウト。",
      en: "Formal layout for major contractors & property management companies.",
    },
    preview_color: "#1e40af",
  },
];
