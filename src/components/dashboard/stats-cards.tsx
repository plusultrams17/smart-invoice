"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";

interface StatsData {
  totalRevenue: number;
  monthlyInvoices: number;
  outstanding: number;
  paidRate: number;
}

export function StatsCards({ data }: { data: StatsData }) {
  const t = useTranslations("dashboard.stats");
  const locale = useLocale();

  const stats = [
    {
      label: t("totalRevenue"),
      value: formatCurrency(data.totalRevenue, locale),
      icon: TrendingUp,
      color: "text-success-600 bg-success-50",
    },
    {
      label: t("monthlyInvoices"),
      value: `${data.monthlyInvoices}`,
      icon: FileText,
      color: "text-primary-600 bg-primary-50",
    },
    {
      label: t("outstanding"),
      value: formatCurrency(data.outstanding, locale),
      icon: AlertCircle,
      color: "text-warning-600 bg-warning-50",
    },
    {
      label: t("paidRate"),
      value: `${data.paidRate}%`,
      icon: CheckCircle,
      color: "text-accent-600 bg-accent-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div className={`rounded-lg p-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
