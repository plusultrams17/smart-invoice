import type { InvoiceLineItem } from "@/types/invoice";

interface AiSuggestion {
  items: Omit<InvoiceLineItem, "id">[];
  notes: string;
}

const suggestions: Record<string, AiSuggestion> = {
  default: {
    items: [
      { description: "工事代金", quantity: 1, unit_price: 100000, amount: 100000 },
    ],
    notes: "お振込期限: 発行日より30日以内にお支払いください。\n振込手数料はお客様のご負担でお願いいたします。",
  },
  exterior_paint: {
    items: [
      { description: "外壁塗装（シリコン塗料・2回塗り）", quantity: 180, unit_price: 3200, amount: 576000 },
      { description: "足場仮設・養生", quantity: 200, unit_price: 900, amount: 180000 },
      { description: "高圧洗浄", quantity: 180, unit_price: 250, amount: 45000 },
      { description: "コーキング打ち替え", quantity: 120, unit_price: 1200, amount: 144000 },
      { description: "付帯部塗装（破風・軒天・雨樋）", quantity: 1, unit_price: 120000, amount: 120000 },
    ],
    notes: "お振込期限: 発行日より30日以内\n工期: 約7〜10日間（天候により変動あり）\n※足場は工事完了後に撤去いたします。",
  },
  roof: {
    items: [
      { description: "屋根塗装（遮熱塗料・タスペーサー込）", quantity: 90, unit_price: 3800, amount: 342000 },
      { description: "足場仮設・養生", quantity: 150, unit_price: 900, amount: 135000 },
      { description: "高圧洗浄", quantity: 90, unit_price: 300, amount: 27000 },
      { description: "棟板金交換・コーキング処理", quantity: 1, unit_price: 85000, amount: 85000 },
    ],
    notes: "お振込期限: 発行日より30日以内\n工期: 約5日間（天候により変動あり）",
  },
  interior: {
    items: [
      { description: "内装塗装（リビング・ダイニング）", quantity: 45, unit_price: 2800, amount: 126000 },
      { description: "下地処理（クラック補修・パテ処理）", quantity: 45, unit_price: 500, amount: 22500 },
      { description: "養生・清掃", quantity: 1, unit_price: 25000, amount: 25000 },
    ],
    notes: "お振込期限: 発行日より30日以内\n工期: 約3日間\n※家具の移動はお客様にてお願いいたします。",
  },
  waterproof: {
    items: [
      { description: "防水工事（ベランダ・ウレタン防水）", quantity: 15, unit_price: 8000, amount: 120000 },
      { description: "下地補修・ケレン", quantity: 15, unit_price: 1500, amount: 22500 },
      { description: "トップコート塗布", quantity: 15, unit_price: 2000, amount: 30000 },
      { description: "排水口清掃・ドレン処理", quantity: 1, unit_price: 15000, amount: 15000 },
    ],
    notes: "お振込期限: 発行日より30日以内\n工期: 約3日間\n※防水保証5年間",
  },
  reform: {
    items: [
      { description: "クロス張替え（6畳×3部屋）", quantity: 36, unit_price: 1500, amount: 54000 },
      { description: "フローリング張替え（LDK 20畳）", quantity: 20, unit_price: 8000, amount: 160000 },
      { description: "巾木交換", quantity: 30, unit_price: 600, amount: 18000 },
      { description: "廃材処理・清掃", quantity: 1, unit_price: 35000, amount: 35000 },
    ],
    notes: "お振込期限: 発行日より30日以内\n工期: 約5日間",
  },
};

export function getMockAiSuggestion(prompt: string): AiSuggestion {
  const lower = prompt.toLowerCase();

  // 外壁塗装
  if (lower.includes("外壁") || lower.includes("塗装") || lower.includes("ペンキ") || lower.includes("paint") || lower.includes("exterior")) {
    return suggestions.exterior_paint;
  }
  // 屋根
  if (lower.includes("屋根") || lower.includes("roof") || lower.includes("スレート") || lower.includes("板金")) {
    return suggestions.roof;
  }
  // 内装
  if (lower.includes("内装") || lower.includes("室内") || lower.includes("interior") || lower.includes("クロス")) {
    return suggestions.interior;
  }
  // 防水
  if (lower.includes("防水") || lower.includes("ベランダ") || lower.includes("waterproof") || lower.includes("バルコニー")) {
    return suggestions.waterproof;
  }
  // リフォーム
  if (lower.includes("リフォーム") || lower.includes("reform") || lower.includes("改修") || lower.includes("フローリング")) {
    return suggestions.reform;
  }

  return suggestions.default;
}
