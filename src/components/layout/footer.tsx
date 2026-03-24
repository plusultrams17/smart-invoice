"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileText } from "lucide-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container-app py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-semibold text-gray-900">
                {t("common.appName")}
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              建設・塗装業のためのAI請求書作成ツール
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {t("footer.product")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                  {t("nav.features")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
                  {t("nav.pricing")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {t("footer.legal")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/legal/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  {t("legal.terms")}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  {t("legal.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/tokushoho" className="text-sm text-gray-600 hover:text-gray-900">
                  {t("legal.tokushoho")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {t("footer.support")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="mailto:support@smartinvoice.jp" className="text-sm text-gray-600 hover:text-gray-900">
                  support@smartinvoice.jp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Smart Invoice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
