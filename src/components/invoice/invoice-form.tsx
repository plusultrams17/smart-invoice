"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { InvoiceLineItems } from "./invoice-line-items";
import { AiAssistButton } from "./ai-assist-button";
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils";
import { TAX_RATE } from "@/lib/constants";
import type { Invoice, InvoiceLineItem } from "@/types/invoice";
import { Save } from "lucide-react";

interface InvoiceFormProps {
  initialData?: Invoice;
}

export function InvoiceForm({ initialData }: InvoiceFormProps) {
  const t = useTranslations("invoice.form");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [invoiceNumber] = useState(
    initialData?.invoice_number || generateInvoiceNumber()
  );
  const [issuedDate, setIssuedDate] = useState(
    initialData?.issued_date || new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(
    initialData?.due_date ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
  );

  const [clientName, setClientName] = useState(initialData?.client_name || "");
  const [clientEmail, setClientEmail] = useState(initialData?.client_email || "");
  const [clientAddress, setClientAddress] = useState(initialData?.client_address || "");
  const [clientCompany, setClientCompany] = useState(initialData?.client_company || "");

  const [senderName, setSenderName] = useState(initialData?.sender_name || "田中太郎");
  const [senderEmail, setSenderEmail] = useState(initialData?.sender_email || "tanaka@example.com");
  const [senderAddress, setSenderAddress] = useState(initialData?.sender_address || "");
  const [senderCompany, setSenderCompany] = useState(initialData?.sender_company || "");
  const [registrationNumber, setRegistrationNumber] = useState(
    initialData?.sender_registration_number || ""
  );

  const [items, setItems] = useState<InvoiceLineItem[]>(
    initialData?.items || [
      { id: "item-1", description: "", quantity: 1, unit_price: 0, amount: 0 },
    ]
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items]
  );
  const taxAmount = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxAmount;

  const handleAiSuggestion = (
    newItems: InvoiceLineItem[],
    suggestedNotes: string
  ) => {
    setItems(newItems);
    if (suggestedNotes) setNotes(suggestedNotes);
  };

  const handleSave = async (status: "draft" | "sent") => {
    setIsSaving(true);
    try {
      const invoiceData = {
        user_id: "user-001",
        invoice_number: invoiceNumber,
        client_name: clientName,
        client_email: clientEmail,
        client_address: clientAddress,
        client_company: clientCompany,
        items,
        subtotal,
        tax_rate: TAX_RATE * 100,
        tax_amount: taxAmount,
        total,
        status,
        due_date: dueDate,
        issued_date: issuedDate,
        notes,
        template_id: "template-standard",
        sender_name: senderName,
        sender_email: senderEmail,
        sender_address: senderAddress,
        sender_company: senderCompany,
        sender_registration_number: registrationNumber,
      };

      const url = initialData
        ? `/api/invoices/${initialData.id}`
        : "/api/invoices";
      const method = initialData ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      router.push("/invoices");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sender Info */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            {t("senderInfo")}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={t("senderName")}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <Input
              label={t("senderEmail")}
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
            <Input
              label={t("senderCompany")}
              value={senderCompany}
              onChange={(e) => setSenderCompany(e.target.value)}
            />
            <Input
              label={t("registrationNumber")}
              placeholder={t("registrationPlaceholder")}
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <div className="sm:col-span-2">
              <Input
                label={t("senderAddress")}
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Info */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            {t("clientInfo")}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={t("clientCompany")}
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
            />
            <Input
              label={t("clientName")}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label={t("clientEmail")}
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
            <Input
              label={t("clientAddress")}
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Info */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            {t("invoiceInfo")}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label={t("invoiceNumber")}
              value={invoiceNumber}
              disabled
            />
            <Input
              label={t("issuedDate")}
              type="date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
            />
            <Input
              label={t("dueDate")}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              {t("items")}
            </h2>
            <AiAssistButton onSuggestion={handleAiSuggestion} />
          </div>
        </CardHeader>
        <CardContent>
          <InvoiceLineItems items={items} onChange={setItems} />

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t("subtotal")}</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(subtotal, locale)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t("tax")}</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(taxAmount, locale)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base">
                <span className="font-semibold text-gray-900">{t("total")}</span>
                <span className="font-bold text-primary-600">
                  {formatCurrency(total, locale)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardContent className="pt-6">
          <Textarea
            label={t("notes")}
            placeholder={t("notesPlaceholder")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => handleSave("draft")}
          isLoading={isSaving}
        >
          {tCommon("save")} ({locale === "ja" ? "下書き" : "Draft"})
        </Button>
        <Button
          onClick={() => handleSave("sent")}
          isLoading={isSaving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {tCommon("save")}
        </Button>
      </div>
    </div>
  );
}
