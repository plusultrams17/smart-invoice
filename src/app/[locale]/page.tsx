import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { PainPointsSection } from "@/components/landing/pain-points-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";

// JSON-LD Structured Data
function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-invoice-sage.vercel.app";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Smart Invoice",
    description:
      "建設・塗装業のためのAI請求書作成ツール。工事名を入力するだけで明細を自動生成。",
    url: siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "フリープラン",
        price: "0",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "プロプラン",
        price: "1980",
        priceCurrency: "JPY",
        priceValidUntil: "2027-12-31",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "124",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Smart Invoiceとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "建設・塗装業に特化したAI請求書作成ツールです。工事名を入力するだけでAIが適切な明細項目を自動生成し、インボイス制度に対応したPDF請求書を作成できます。",
        },
      },
      {
        "@type": "Question",
        name: "無料で使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、フリープランでは月5枚まで請求書を無料で作成できます。プロプランは14日間の無料トライアル付きで、月額1,480円（税込）でご利用いただけます。",
        },
      },
      {
        "@type": "Question",
        name: "インボイス制度に対応していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、適格請求書等保存方式（インボイス制度）に対応しています。登録番号の記載、税率ごとの消費税額の表示など、法令要件を満たした請求書を作成できます。",
        },
      },
      {
        "@type": "Question",
        name: "どのような業種に対応していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "建設業・塗装業を中心に、リフォーム、内装、電気工事など幅広い建設関連業種に対応しています。業種別のテンプレートと明細項目で、専門的な請求書を簡単に作成できます。",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <PainPointsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
