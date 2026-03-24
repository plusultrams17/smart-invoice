"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { InvoiceStatusBadge } from "@/components/invoice/invoice-status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockInvoices } from "@/lib/mock/invoices";
import { PdfDownloadButton } from "@/components/pdf/pdf-download-button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export default function InvoiceDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const invoice = mockInvoices.find((i) => i.id === params.id);

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500">Invoice not found</p>
        <Link href="/invoices" className="mt-4">
          <Button variant="outline">{t("common.back")}</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
    router.push("/invoices");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {invoice.invoice_number}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <InvoiceStatusBadge status={invoice.status} />
              <span className="text-sm text-gray-500">
                {formatDate(invoice.issued_date, locale)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/invoices/${invoice.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              {t("common.edit")}
            </Button>
          </Link>
          <PdfDownloadButton invoice={invoice} />
          <Button
            variant="danger"
            size="sm"
            className="gap-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Preview */}
          <Card>
            <CardContent className="py-8">
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {invoice.sender_company || invoice.sender_name}
                  </h2>
                  <p className="text-sm text-gray-500">{invoice.sender_email}</p>
                  <p className="text-sm text-gray-500">{invoice.sender_address}</p>
                  {invoice.sender_registration_number && (
                    <p className="mt-1 text-xs text-gray-400">
                      {locale === "ja" ? "登録番号: " : "Reg No: "}
                      {invoice.sender_registration_number}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600">
                    {formatCurrency(invoice.total, locale)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t("invoice.form.dueDate")}: {formatDate(invoice.due_date, locale)}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {t("invoice.form.clientInfo")}
                </p>
                <p className="font-medium text-gray-900">
                  {invoice.client_company}
                </p>
                <p className="text-sm text-gray-600">{invoice.client_name}</p>
                <p className="text-sm text-gray-500">{invoice.client_address}</p>
              </div>

              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="pb-3">{t("invoice.form.description")}</th>
                    <th className="pb-3 text-right">{t("invoice.form.quantity")}</th>
                    <th className="pb-3 text-right">{t("invoice.form.unitPrice")}</th>
                    <th className="pb-3 text-right">{t("invoice.form.amount")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="py-3 text-sm text-gray-600 text-right">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-sm text-gray-600 text-right">
                        {formatCurrency(item.unit_price, locale)}
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(item.amount, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("invoice.form.subtotal")}</span>
                    <span>{formatCurrency(invoice.subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("invoice.form.tax")}</span>
                    <span>{formatCurrency(invoice.tax_amount, locale)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                    <span>{t("invoice.form.total")}</span>
                    <span className="text-primary-600">
                      {formatCurrency(invoice.total, locale)}
                    </span>
                  </div>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                    {t("invoice.form.notes")}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-900">
                {t("invoice.detail")}
              </h3>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">{t("invoice.form.invoiceNumber")}</dt>
                  <dd className="font-medium">{invoice.invoice_number}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">{t("invoice.form.issuedDate")}</dt>
                  <dd>{formatDate(invoice.issued_date, locale)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">{t("invoice.form.dueDate")}</dt>
                  <dd>{formatDate(invoice.due_date, locale)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">{t("invoice.form.clientEmail")}</dt>
                  <dd>{invoice.client_email}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t("common.confirm")}
      >
        <p className="text-sm text-gray-600">{t("invoice.deleteConfirm")}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            {t("common.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("common.delete")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
