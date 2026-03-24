"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";
import { Sparkles, Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import type { InvoiceLineItem } from "@/types/invoice";

interface AiAssistButtonProps {
  onSuggestion: (items: InvoiceLineItem[], notes: string) => void;
}

export function AiAssistButton({ onSuggestion }: AiAssistButtonProps) {
  const t = useTranslations("invoice.ai");
  const { canUseAi } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (!canUseAi()) {
      setShowUpgrade(true);
      return;
    }
    setIsOpen(true);
  };

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

  const isLocked = !canUseAi();

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="gap-2"
        onClick={handleClick}
      >
        {isLocked ? (
          <Lock className="h-4 w-4 text-gray-400" />
        ) : (
          <Sparkles className="h-4 w-4 text-accent-500" />
        )}
        {t("assist")}
        {isLocked && (
          <span className="ml-1 rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-semibold text-primary-700">
            PRO
          </span>
        )}
      </Button>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        reason="ai_feature"
      />

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
