import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Smart Invoiceのプライバシーポリシー。収集する情報、利用目的、第三者への提供、データの保管について。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-app py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">プライバシーポリシー</h1>
        <p className="mt-2 text-sm text-gray-500">最終更新日: 2026年3月24日</p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. 収集する情報</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              当社は以下の情報を収集します：アカウント情報（氏名、メールアドレス）、請求書データ（顧客情報、金額等）、利用状況データ（アクセスログ、機能利用状況）、決済情報（Stripeを通じて処理、当社ではカード情報を保持しません）。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. 情報の利用目的</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              収集した情報はサービスの提供・改善、カスタマーサポート、利用料金の請求、サービスに関する通知の送付に利用します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. 第三者への提供</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供しません。ただし、サービス提供に必要な範囲で、以下の第三者サービスと情報を共有します：Stripe（決済処理）、Supabase（データ保管）、Google（認証）。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. データの保管</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              データはSSL暗号化通信により安全に転送され、暗号化された状態で保管されます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. ユーザーの権利</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              ユーザーは自身のデータの閲覧、訂正、削除を請求できます。アカウントの削除により、関連するすべてのデータが削除されます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">6. Cookie</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              本サービスはセッション管理および分析のためにCookieを使用します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">7. お問い合わせ</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              プライバシーに関するお問い合わせは support@smartinvoice.jp までご連絡ください。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
