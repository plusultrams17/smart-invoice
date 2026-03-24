"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/auth-context";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";
import { PLANS } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

export default function NewInvoicePage() {
  const t = useTranslations("invoice");
  const { canCreateInvoice, getRemainingInvoices, user } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const remaining = getRemainingInvoices();
  const limit = PLANS[user?.plan || "free"].invoiceLimit;
  const canCreate = canCreateInvoice();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("new")}</h1>

      {/* Usage warning */}
      {canCreate && remaining !== Infinity && remaining <= 2 && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-sm text-amber-700">
            {user?.plan === "free" && remaining === 1
              ? "残り1枚です。プロプランにアップグレードして無制限に作成しましょう。"
              : `残り${remaining}枚 / 月${limit}枚`}
          </p>
          <button
            onClick={() => setShowUpgrade(true)}
            className="ml-auto shrink-0 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            アップグレード
          </button>
        </div>
      )}

      {/* Limit reached */}
      {!canCreate ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            今月の作成上限に達しました
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            フリープランでは月{limit}枚まで請求書を作成できます。
          </p>
          <button
            onClick={() => setShowUpgrade(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            プロプランにアップグレード
          </button>
        </div>
      ) : (
        <InvoiceForm />
      )}

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        reason="invoice_limit"
      />
    </div>
  );
}
