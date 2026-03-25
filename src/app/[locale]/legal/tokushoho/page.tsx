import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表示",
  description: "Smart Invoiceの特定商取引法に基づく表示。販売事業者、販売価格、支払方法、返品・キャンセルポリシーについて。",
};

export default function TokushohoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-app py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">
          特定商取引法に基づく表示
        </h1>
        <p className="mt-2 text-sm text-gray-500">最終更新日: 2026年3月24日</p>

        <div className="mt-8">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {[
                ["販売事業者", "HAKUSO（屋号）"],
                ["運営責任者", "白倉 幹"],
                ["所在地", "お問い合わせいただいた方にお知らせいたします"],
                ["電話番号", "お問い合わせいただいた方にお知らせいたします"],
                ["メールアドレス", "support@smartinvoice.jp"],
                ["販売URL", "https://smart-invoice-sage.vercel.app"],
                ["販売価格", "プロプラン: 月額1,980円（税込）"],
                ["支払方法", "クレジットカード（Stripe経由）"],
                ["支払時期", "サブスクリプション開始時および毎月の更新時に自動課金"],
                ["商品引渡し時期", "お申し込み後、即時にサービスをご利用いただけます"],
                [
                  "返品・キャンセル",
                  "14日間の無料トライアル期間中は無料でキャンセル可能。有料期間中の解約は次回請求日まで利用可能。日割り返金はいたしません。",
                ],
                [
                  "動作環境",
                  "最新版のChrome、Firefox、Safari、Edgeブラウザ。インターネット接続が必要です。",
                ],
              ].map(([label, value]) => (
                <tr key={label}>
                  <th className="py-4 pr-4 text-left text-sm font-medium text-gray-900 align-top w-40">
                    {label}
                  </th>
                  <td className="py-4 text-sm text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
