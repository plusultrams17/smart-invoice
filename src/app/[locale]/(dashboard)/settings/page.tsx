"use client";

import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { PLANS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const locale = useLocale() as "ja" | "en";
  const { user, updatePlan } = useAuth();

  const handleUpgrade = async (planId: string) => {
    if (planId === "free") {
      updatePlan("free");
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId }),
    });
    await res.json();

    // Mock: directly update plan instead of redirecting to Stripe
    updatePlan(planId as "free" | "pro" | "team");
    alert(
      locale === "ja"
        ? `${PLANS[planId as keyof typeof PLANS].name.ja}プランにアップグレードしました！(モック)`
        : `Upgraded to ${PLANS[planId as keyof typeof PLANS].name.en} plan! (Mock)`
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>

      {/* Profile */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            {t("profile")}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={locale === "ja" ? "名前" : "Name"}
              value={user?.name || ""}
              disabled
            />
            <Input
              label={locale === "ja" ? "メールアドレス" : "Email"}
              value={user?.email || ""}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            {t("language")}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-3">
            {t("languageDescription")}
          </p>
          <LocaleSwitcher />
        </CardContent>
      </Card>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              {t("plan")}
            </h2>
            <Badge variant="primary">
              {t("currentPlan")}:{" "}
              {PLANS[user?.plan || "free"].name[locale]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.values(PLANS).map((plan) => {
              const isCurrentPlan = user?.plan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "rounded-xl border p-4",
                    isCurrentPlan
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {plan.id === "pro" && (
                      <Crown className="h-4 w-4 text-primary-600" />
                    )}
                    <h3 className="font-semibold text-gray-900">
                      {plan.name[locale]}
                    </h3>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {formatCurrency(plan.price, locale)}
                    {plan.price > 0 && (
                      <span className="text-sm font-normal text-gray-500">
                        /{locale === "ja" ? "月" : "mo"}
                      </span>
                    )}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.features[locale].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isCurrentPlan ? "secondary" : "primary"}
                    size="sm"
                    className="mt-4 w-full"
                    disabled={isCurrentPlan}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {isCurrentPlan
                      ? locale === "ja"
                        ? "現在のプラン"
                        : "Current Plan"
                      : t("upgrade")}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
