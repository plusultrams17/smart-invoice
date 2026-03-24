export const PLANS = {
  free: {
    id: "free",
    name: { ja: "フリー", en: "Free" },
    price: 0,
    invoiceLimit: 100,
    features: {
      ja: ["月100枚まで請求書作成", "基本テンプレート3種", "PDF出力", "請求書管理"],
      en: ["Up to 100 invoices/month", "3 basic templates", "PDF export", "Invoice management"],
    },
  },
  pro: {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: 980,
    invoiceLimit: Infinity,
    features: {
      ja: ["無制限の請求書作成", "全テンプレート利用可能", "AI請求書アシスタント", "優先サポート"],
      en: ["Unlimited invoices", "All templates", "AI invoice assistant", "Priority support"],
    },
  },
  team: {
    id: "team",
    name: { ja: "チーム", en: "Team" },
    price: 2980,
    invoiceLimit: Infinity,
    features: {
      ja: ["プロプランの全機能", "5人までのチーム", "チーム請求書管理", "API連携"],
      en: ["All Pro features", "Up to 5 team members", "Team invoice management", "API access"],
    },
  },
} as const;

export const TAX_RATE = 0.1;
export const APP_NAME = "Smart Invoice";
