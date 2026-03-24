"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

const statusVariants: Record<InvoiceStatus, "default" | "primary" | "success" | "warning" | "danger"> = {
  draft: "default",
  sent: "primary",
  paid: "success",
  overdue: "danger",
  cancelled: "warning",
};

export function RecentInvoices({ invoices }: { invoices: Invoice[] }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("dashboard.recentInvoices")}
          </h2>
          <Link
            href="/invoices"
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t("dashboard.viewAll")}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">{t("invoice.form.invoiceNumber")}</th>
                <th className="px-6 py-3">{t("invoice.form.clientName")}</th>
                <th className="px-6 py-3">{t("invoice.form.amount")}</th>
                <th className="px-6 py-3">{t("invoice.form.dueDate")}</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      {invoice.invoice_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        {invoice.client_company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {invoice.client_name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.total, locale)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(invoice.due_date, locale)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariants[invoice.status]}>
                      {t(`invoice.status.${invoice.status}`)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
