"use client";

import { useTranslations, useLocale } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: "invoice_limit" | "ai_feature" | "template" | "general";
}

export function UpgradeModal({ isOpen, onClose, reason = "general" }: UpgradeModalProps) {
  const t = useTranslations("upgrade");
  const locale = useLocale() as "ja" | "en";
  const { updatePlan } = useAuth();

  const handleUpgrade = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "pro" }),
    });
    const data = await res.json();

    if (data.url && data.url !== "#mock-checkout") {
      window.location.href = data.url;
    } else {
      // Mock: directly upgrade
      updatePlan("pro");
      onClose();
    }
  };

  const reasonMessages: Record<string, { ja: string; en: string }> = {
    invoice_limit: {
      ja: "今月の無料枠（5枚）を使い切りました。",
      en: "You've reached the free plan limit (5 invoices/month).",
    },
    ai_feature: {
      ja: "AI自動入力はプロプラン限定の機能です。",
      en: "AI auto-fill is a Pro plan feature.",
    },
    template: {
      ja: "追加テンプレートはプロプラン限定です。",
      en: "Additional templates are available on the Pro plan.",
    },
    general: {
      ja: "",
      en: "",
    },
  };

  const benefits = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
          <Crown className="h-7 w-7 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
        {reasonMessages[reason]?.[locale] && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {reasonMessages[reason][locale]}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <ul className="my-5 space-y-3">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100">
              {i === 1 ? (
                <Sparkles className="h-3 w-3 text-primary-600" />
              ) : (
                <Check className="h-3 w-3 text-primary-600" />
              )}
            </div>
            {benefit}
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <Button onClick={handleUpgrade} className="w-full gap-2">
          <Crown className="h-4 w-4" />
          {t("cta")}
        </Button>
        <p className="text-center text-xs text-gray-400">
          {t("price")} &middot; {t("guarantee")}
        </p>
      </div>
    </Modal>
  );
}
