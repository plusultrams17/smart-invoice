"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/contexts/auth-context";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";
import { mockInvoices } from "@/lib/mock/invoices";
import { PLANS } from "@/lib/constants";
import { Crown } from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale() as "ja" | "en";
  const { user, invoiceCount, getRemainingInvoices } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const paidInvoices = mockInvoices.filter((i) => i.status === "paid");
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);
  const currentMonth = new Date().getMonth();
  const monthlyInvoices = mockInvoices.filter(
    (i) => new Date(i.created_at).getMonth() === currentMonth
  ).length;
  const outstanding = mockInvoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.total, 0);
  const paidRate =
    mockInvoices.length > 0
      ? Math.round((paidInvoices.length / mockInvoices.length) * 100)
      : 0;

  const plan = PLANS[user?.plan || "free"];
  const remaining = getRemainingInvoices();
  const isFreePlan = user?.plan === "free";
  const usagePercent =
    plan.invoiceLimit === Infinity
      ? 0
      : Math.min(100, Math.round((invoiceCount / plan.invoiceLimit) * 100));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {t("welcome", { name: user?.name || "" })}
        </p>
      </div>

      {/* Usage Bar (free plan only) */}
      {isFreePlan && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {locale === "ja" ? "今月の利用状況" : "Monthly Usage"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {locale === "ja"
                  ? `${invoiceCount} / ${plan.invoiceLimit}枚の請求書を作成済み`
                  : `${invoiceCount} / ${plan.invoiceLimit} invoices created`}
              </p>
            </div>
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100 transition-colors"
            >
              <Crown className="h-3.5 w-3.5" />
              {locale === "ja" ? "プロにアップグレード" : "Upgrade to Pro"}
            </button>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-100">
            <div
              className={`h-2.5 rounded-full transition-all ${
                usagePercent >= 80
                  ? "bg-red-500"
                  : usagePercent >= 60
                    ? "bg-amber-500"
                    : "bg-primary-500"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          {remaining <= 2 && remaining > 0 && (
            <p className="mt-2 text-xs text-amber-600 font-medium">
              {locale === "ja"
                ? `残り${remaining}枚です。アップグレードで無制限に。`
                : `${remaining} remaining. Upgrade for unlimited.`}
            </p>
          )}
          {remaining === 0 && (
            <p className="mt-2 text-xs text-red-600 font-medium">
              {locale === "ja"
                ? "上限に達しました。アップグレードして作成を続けましょう。"
                : "Limit reached. Upgrade to continue creating invoices."}
            </p>
          )}
        </div>
      )}

      <StatsCards
        data={{
          totalRevenue,
          monthlyInvoices,
          outstanding,
          paidRate,
        }}
      />

      <RecentInvoices invoices={mockInvoices.slice(0, 5)} />

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        reason="general"
      />
    </div>
  );
}
