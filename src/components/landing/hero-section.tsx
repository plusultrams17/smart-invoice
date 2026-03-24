"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-white py-20 sm:py-32">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Invoicing
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl whitespace-pre-line leading-tight">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg text-gray-600 sm:text-xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 px-8">
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg">
                {t("secondaryCta")}
              </Button>
            </a>
          </div>

          <div className="mt-16 relative">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl shadow-primary-500/10">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <FileText className="h-8 w-8 text-primary-600" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    請求書 #INV-2026-001
                  </div>
                  <div className="text-xs text-gray-500">
                    株式会社サンプル 様
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ¥385,000
                  </div>
                  <div className="inline-flex items-center rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600">
                    支払済み
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Webサイトデザイン</span>
                  <span className="text-gray-900">¥150,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    フロントエンド開発 × 40h
                  </span>
                  <span className="text-gray-900">¥200,000</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-medium">
                  <span className="text-gray-700">消費税 (10%)</span>
                  <span className="text-gray-900">¥35,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
