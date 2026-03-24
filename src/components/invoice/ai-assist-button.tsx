"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Sparkles } from "lucide-react";
import type { InvoiceLineItem } from "@/types/invoice";

interface AiAssistButtonProps {
  onSuggestion: (items: InvoiceLineItem[], notes: string) => void;
}

export function AiAssistButton({ onSuggestion }: AiAssistButtonProps) {
  const t = useTranslations("invoice.ai");
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.suggestion) {
        const items = data.suggestion.items.map(
          (item: Omit<InvoiceLineItem, "id">, idx: number) => ({
            ...item,
            id: `ai-item-${Date.now()}-${idx}`,
          })
        );
        onSuggestion(items, data.suggestion.notes);
        setIsOpen(false);
        setPrompt("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-4 w-4 text-accent-500" />
        {t("assist")}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t("assist")}>
        <div className="space-y-4">
          <Textarea
            label={t("prompt")}
            placeholder={t("promptPlaceholder")}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              {t("assist") === "AI Auto-fill" ? "Cancel" : "キャンセル"}
            </Button>
            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!prompt.trim()}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isLoading ? t("generating") : t("assist")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
