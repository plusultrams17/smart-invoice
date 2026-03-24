"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">
            {t("common.appName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.features")}
          </a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.pricing")}
          </a>
          <LocaleSwitcher />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              {t("common.login")}
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">{t("common.signup")}</Button>
          </Link>
        </nav>

        <button
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.features")}
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.pricing")}
            </a>
            <div className="pt-2">
              <LocaleSwitcher />
            </div>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                {t("common.login")}
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full">
                {t("common.signup")}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
