"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = ["free", "pro", "team"] as const;

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

        <div className="mt-16 grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isPopular = plan === "pro";
            const features = t.raw(`${plan}.features`) as string[];

            return (
              <div
                key={plan}
                className={cn(
                  "relative rounded-2xl border bg-white p-8",
                  isPopular
                    ? "border-primary-600 shadow-xl shadow-primary-500/10 scale-105"
                    : "border-gray-200"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-medium text-white">
                    {t("pro.popular")}
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t(`${plan}.name`)}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {t(`${plan}.price`)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      {t(`${plan}.period`)}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/login" className="block mt-8">
                  <Button
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full"
                  >
                    {t(`${plan}.cta`)}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
