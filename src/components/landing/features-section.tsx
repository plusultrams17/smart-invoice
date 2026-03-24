"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Palette, Download, LayoutDashboard } from "lucide-react";

const features = [
  { key: "ai", icon: Sparkles },
  { key: "templates", icon: Palette },
  { key: "pdf", icon: Download },
  { key: "manage", icon: LayoutDashboard },
] as const;

export function FeaturesSection() {
  const t = useTranslations("landing.features");

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
