"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const t = useTranslations("landing.pricing");

  return (
    <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {t("free.name")}
              </h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  {t("free.price")}
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  {t("free.period")}
                </span>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {(t.raw("free.features") as string[]).map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-600">{f}</span>
                </li>
              ))}
              {(t.raw("free.limitations") as string[]).map((f, i) => (
                <li key={`lim-${i}`} className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                  <span className="text-sm text-gray-400">{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/login" className="block mt-8">
              <Button variant="outline" className="w-full">
                {t("free.cta")}
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div
            className={cn(
              "relative rounded-2xl border-2 border-primary-600 bg-white p-8 shadow-xl shadow-primary-500/10"
            )}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-medium text-white">
              {t("pro.popular")}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {t("pro.name")}
              </h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  {t("pro.price")}
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  {t("pro.period")}
                </span>
              </div>
              <p className="mt-2 text-sm text-primary-600 font-medium">
                {t("trial")}
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {(t.raw("pro.features") as string[]).map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                  <span className="text-sm text-gray-600">{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/login" className="block mt-8">
              <Button className="w-full">{t("pro.cta")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
