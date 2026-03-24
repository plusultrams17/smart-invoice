"use client";

import { useTranslations } from "next-intl";

export function TrustSection() {
  const t = useTranslations("landing.trust");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-12">
      <div className="container-app">
        <p className="text-center text-lg text-gray-600">
          {t("title")}
          <span className="ml-1 text-2xl font-bold text-primary-600">
            {t("highlight")}
          </span>
          <span className="ml-1 text-gray-600">{t("suffix")}</span>
        </p>

        <div className="mt-8 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
