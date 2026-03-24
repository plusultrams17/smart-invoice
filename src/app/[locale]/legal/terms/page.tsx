import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Smart Invoiceの利用規約。サービスの利用条件、料金・支払い、禁止事項、免責事項について。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-app py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">利用規約</h1>
        <p className="mt-2 text-sm text-gray-500">最終更新日: 2026年3月24日</p>

        <div className="mt-8 prose prose-gray prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">第1条（適用）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              本規約は、Smart Invoice（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第2条（アカウント）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              ユーザーは正確な情報を提供してアカウントを作成するものとします。アカウントの管理責任はユーザーにあります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第3条（料金・支払い）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              有料プランの料金は月額制です。14日間の無料トライアル期間終了後、自動的に課金が開始されます。解約はいつでも可能で、次回請求日以降の課金は発生しません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第4条（禁止事項）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              法令に違反する行為、サービスの運営を妨害する行為、他のユーザーに迷惑をかける行為、リバースエンジニアリング等を禁止します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第5条（免責事項）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              本サービスで作成された請求書の内容の正確性について、当社は保証いたしません。請求書の内容はユーザーの責任で確認してください。AI生成機能による提案は参考情報であり、最終的な判断はユーザーが行うものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第6条（サービスの変更・終了）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              当社は事前に通知の上、本サービスの内容を変更または終了できるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">第7条（準拠法・管轄）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
