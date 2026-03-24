"use client";

import { useTranslations } from "next-intl";
import { InvoiceForm } from "@/components/invoice/invoice-form";

export default function NewInvoicePage() {
  const t = useTranslations("invoice");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("new")}</h1>
      <InvoiceForm />
    </div>
  );
}
