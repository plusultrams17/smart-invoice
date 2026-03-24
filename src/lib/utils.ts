import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string = "ja"): string {
  if (locale === "ja") {
    return `¥${amount.toLocaleString("ja-JP")}`;
  }
  return `¥${amount.toLocaleString("en-US")}`;
}

export function formatDate(date: string, locale: string = "ja"): string {
  return new Date(date).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `INV-${year}${month}-${random}`;
}
