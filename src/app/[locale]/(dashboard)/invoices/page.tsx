"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InvoiceStatusBadge } from "@/components/invoice/invoice-status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockInvoices } from "@/lib/mock/invoices";
import { Plus, FileText } from "lucide-react";
import type { InvoiceStatus } from "@/types/invoice";

const statuses: (InvoiceStatus | "all")[] = [
  "all",
  "draft",
  "sent",
  "paid",
  "overdue",
];

export default function InvoicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [filter, setFilter] = useState<InvoiceStatus | "all">("all");

  const filteredInvoices =
    filter === "all"
      ? mockInvoices
      : mockInvoices.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("invoice.list")}
        </h1>
        <Link href="/invoices/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("invoice.new")}
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === status
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status === "all" ? t("common.all") : t(`invoice.status.${status}`)}
          </button>
        ))}
      </div>

      {filteredInvoices.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <FileText className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">{t("invoice.empty")}</p>
          <Link href="/invoices/new" className="mt-4">
            <Button>{t("invoice.new")}</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
              <Card className="p-4 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {invoice.invoice_number}
                      </p>
                      <p className="text-xs text-gray-500">
                        {invoice.client_company} - {invoice.client_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(invoice.total, locale)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(invoice.due_date, locale)}
                      </p>
                    </div>
                    <InvoiceStatusBadge status={invoice.status} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
