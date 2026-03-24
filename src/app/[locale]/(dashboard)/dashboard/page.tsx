"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/auth-context";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { mockInvoices } from "@/lib/mock/invoices";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { user } = useAuth();

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {t("welcome", { name: user?.name || "" })}
        </p>
      </div>

      <StatsCards
        data={{
          totalRevenue,
          monthlyInvoices,
          outstanding,
          paidRate,
        }}
      />

      <RecentInvoices invoices={mockInvoices.slice(0, 5)} />
    </div>
  );
}
