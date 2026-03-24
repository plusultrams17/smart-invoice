import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Invoice - AI請求書ジェネレーター",
  description:
    "AIが簡単・迅速に請求書を作成。フリーランスと中小企業のための請求書管理ツール。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
