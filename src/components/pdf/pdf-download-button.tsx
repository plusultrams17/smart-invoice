"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { PLANS } from "@/lib/constants";
import type { Invoice } from "@/types/invoice";

interface PdfDownloadButtonProps {
  invoice: Invoice;
}

export function PdfDownloadButton({ invoice }: PdfDownloadButtonProps) {
  const t = useTranslations("invoice.pdf");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const showWatermark = PLANS[user?.plan || "free"].hasWatermark;

  const handleDownload = useCallback(async () => {
    setIsLoading(true);

    try {
      // Dynamic import to avoid SSR issues with @react-pdf/renderer
      const { pdf } = await import("@react-pdf/renderer");
      const { InvoicePdfDocument } = await import("./invoice-pdf-document");
      const React = await import("react");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element = React.createElement(InvoicePdfDocument, { invoice, showWatermark }) as any;
      const blob = await pdf(element).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [invoice, showWatermark]);

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleDownload}
      isLoading={isLoading}
    >
      <Download className="h-4 w-4" />
      {t("download")}
    </Button>
  );
}
