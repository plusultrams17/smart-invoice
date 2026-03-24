"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/types/invoice";

const statusVariants: Record<InvoiceStatus, "default" | "primary" | "success" | "warning" | "danger"> = {
  draft: "default",
  sent: "primary",
  paid: "success",
  overdue: "danger",
  cancelled: "warning",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const t = useTranslations("invoice.status");
  return <Badge variant={statusVariants[status]}>{t(status)}</Badge>;
}
