"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { InvoiceLineItem } from "@/types/invoice";

interface InvoiceLineItemsProps {
  items: InvoiceLineItem[];
  onChange: (items: InvoiceLineItem[]) => void;
}

export function InvoiceLineItems({ items, onChange }: InvoiceLineItemsProps) {
  const t = useTranslations("invoice.form");

  const addItem = () => {
    const newItem: InvoiceLineItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unit_price: 0,
      amount: 0,
    };
    onChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceLineItem,
    value: string | number
  ) => {
    onChange(
      items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "unit_price") {
          updated.amount = Number(updated.quantity) * Number(updated.unit_price);
        }
        return updated;
      })
    );
  };

  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-1">
        <div className="col-span-5">{t("description")}</div>
        <div className="col-span-2">{t("quantity")}</div>
        <div className="col-span-2">{t("unitPrice")}</div>
        <div className="col-span-2">{t("amount")}</div>
        <div className="col-span-1" />
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end rounded-lg border border-gray-100 p-3 sm:border-0 sm:p-0"
        >
          <div className="sm:col-span-5">
            <Input
              placeholder={t("description")}
              value={item.description}
              onChange={(e) =>
                updateItem(item.id, "description", e.target.value)
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="number"
              min="1"
              placeholder={t("quantity")}
              value={item.quantity || ""}
              onChange={(e) =>
                updateItem(item.id, "quantity", Number(e.target.value))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="number"
              min="0"
              placeholder={t("unitPrice")}
              value={item.unit_price || ""}
              onChange={(e) =>
                updateItem(item.id, "unit_price", Number(e.target.value))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="number"
              value={item.amount}
              disabled
              className="bg-gray-50 font-medium"
            />
          </div>
          <div className="sm:col-span-1 flex justify-end">
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="rounded-lg p-2 text-gray-400 hover:bg-danger-50 hover:text-danger-500"
              disabled={items.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={addItem}
      >
        <Plus className="h-4 w-4" />
        {t("addItem")}
      </Button>
    </div>
  );
}
