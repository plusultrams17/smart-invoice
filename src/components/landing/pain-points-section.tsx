"use client";

import { useTranslations } from "next-intl";
import { AlertCircle, ArrowRight } from "lucide-react";

export function PainPointsSection() {
  const t = useTranslations("landing.painPoints");
  const items = t.raw("items") as {
    problem: string;
    solution: string;
  }[];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <AlertCircle className="h-5 w-5 text-danger-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.problem}</p>
                  <div className="mt-3 flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                    <p className="text-sm text-gray-600">{item.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
