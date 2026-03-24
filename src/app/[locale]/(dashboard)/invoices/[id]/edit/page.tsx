"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { mockInvoices } from "@/lib/mock/invoices";

export default function EditInvoicePage() {
  const t = useTranslations("invoice");
  const params = useParams();

  const invoice = mockInvoices.find((i) => i.id === params.id);

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500">Invoice not found</p>
        <Link href="/invoices" className="mt-4">
          <Button variant="outline">Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("edit")}</h1>
      <InvoiceForm initialData={invoice} />
    </div>
  );
}
