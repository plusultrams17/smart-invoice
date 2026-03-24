"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTemplates } from "@/lib/mock/templates";
import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const t = useTranslations("templates");
  const locale = useLocale() as "ja" | "en";
  const [selected, setSelected] = useState("template-standard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockTemplates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer transition-all overflow-hidden",
              selected === template.id
                ? "border-primary-600 ring-2 ring-primary-600"
                : "hover:border-gray-300 hover:shadow-md"
            )}
            onClick={() => setSelected(template.id)}
          >
            <div
              className="h-32 flex items-center justify-center"
              style={{ backgroundColor: template.preview_color + "15" }}
            >
              <FileText
                className="h-16 w-16"
                style={{ color: template.preview_color }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {template.name[locale]}
                </h3>
                {selected === template.id && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {template.description[locale]}
              </p>
              <Button
                variant={selected === template.id ? "primary" : "outline"}
                size="sm"
                className="mt-3 w-full"
                onClick={() => setSelected(template.id)}
              >
                {selected === template.id ? t("selected") : t("select")}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
