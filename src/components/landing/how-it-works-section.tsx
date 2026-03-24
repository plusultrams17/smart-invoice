"use client";

import { useTranslations } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("landing.howItWorks");
  const steps = t.raw("steps") as {
    step: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                {step.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] border-t-2 border-dashed border-primary-200" />
              )}
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
