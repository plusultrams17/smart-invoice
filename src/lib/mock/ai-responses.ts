import type { InvoiceLineItem } from "@/types/invoice";

interface AiSuggestion {
  items: Omit<InvoiceLineItem, "id">[];
  notes: string;
}

const suggestions: Record<string, AiSuggestion> = {
  default: {
    items: [
      { description: "サービス料", quantity: 1, unit_price: 100000, amount: 100000 },
    ],
    notes: "お振込期限: 発行日より30日以内にお支払いください。",
  },
  web: {
    items: [
      { description: "Webサイトデザイン", quantity: 1, unit_price: 150000, amount: 150000 },
      { description: "フロントエンド実装", quantity: 1, unit_price: 200000, amount: 200000 },
      { description: "レスポンシブ対応", quantity: 1, unit_price: 50000, amount: 50000 },
      { description: "テスト・修正", quantity: 1, unit_price: 30000, amount: 30000 },
    ],
    notes: "納品後30日以内にお振込みください。\n振込手数料はお客様のご負担でお願いいたします。",
  },
  app: {
    items: [
      { description: "アプリUI/UXデザイン", quantity: 1, unit_price: 200000, amount: 200000 },
      { description: "フロントエンド開発", quantity: 60, unit_price: 5000, amount: 300000 },
      { description: "バックエンドAPI開発", quantity: 40, unit_price: 6000, amount: 240000 },
      { description: "テスト・QA", quantity: 20, unit_price: 4000, amount: 80000 },
    ],
    notes: "月末締め翌月末払いでお願いいたします。",
  },
  consulting: {
    items: [
      { description: "コンサルティング", quantity: 10, unit_price: 15000, amount: 150000 },
      { description: "調査・分析レポート", quantity: 1, unit_price: 80000, amount: 80000 },
      { description: "プレゼンテーション資料作成", quantity: 1, unit_price: 50000, amount: 50000 },
    ],
    notes: "請求書発行日より30日以内にお振込みください。",
  },
};

export function getMockAiSuggestion(prompt: string): AiSuggestion {
  const lower = prompt.toLowerCase();
  if (lower.includes("web") || lower.includes("サイト") || lower.includes("ホームページ")) {
    return suggestions.web;
  }
  if (lower.includes("アプリ") || lower.includes("app") || lower.includes("モバイル")) {
    return suggestions.app;
  }
  if (lower.includes("コンサル") || lower.includes("consulting") || lower.includes("調査")) {
    return suggestions.consulting;
  }
  return suggestions.default;
}
