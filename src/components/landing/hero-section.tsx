"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowRight, Shield, Clock } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-white py-20 sm:py-32">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Invoicing for Construction
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl whitespace-pre-line leading-tight">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg text-gray-600 sm:text-xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 px-8 text-base">
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

          <p className="mt-3 text-sm text-gray-500 flex items-center justify-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            {t("noCreditCard")}
          </p>

          {/* Demo Invoice Preview */}
          <div className="mt-16 relative">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl shadow-primary-500/10">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <FileText className="h-8 w-8 text-primary-600" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    請求書 #INV-2026-042
                  </div>
                  <div className="text-xs text-gray-500">
                    山田建設株式会社 様
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-success-500" />
                  <span className="text-xs text-success-600 font-medium">
                    AI生成: 10秒
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ¥1,485,000
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">外壁塗装（シリコン系塗料 2回塗り）</span>
                  <span className="text-gray-900">¥850,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">仮設足場設置・撤去</span>
                  <span className="text-gray-900">¥280,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">高圧洗浄</span>
                  <span className="text-gray-900">¥80,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">養生費</span>
                  <span className="text-gray-900">¥60,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">諸経費</span>
                  <span className="text-gray-900">¥80,000</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-medium">
                  <span className="text-gray-700">消費税 (10%)</span>
                  <span className="text-gray-900">¥135,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
