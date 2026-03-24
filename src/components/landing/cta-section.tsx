"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const t = useTranslations("landing.cta");

  return (
    <section className="py-20 sm:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-16 text-center shadow-2xl shadow-primary-500/25">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-primary-100">{t("subtitle")}</p>
          <Link href="/login" className="mt-8 inline-block">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary-700 hover:bg-primary-50"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
