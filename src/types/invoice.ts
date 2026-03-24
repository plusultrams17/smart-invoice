export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Invoice {
  id: string;
  user_id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  client_address: string;
  client_company: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  status: InvoiceStatus;
  due_date: string;
  issued_date: string;
  notes: string;
  template_id: string;
  sender_name: string;
  sender_email: string;
  sender_address: string;
  sender_company: string;
  sender_registration_number: string;
  created_at: string;
  updated_at: string;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface InvoiceTemplate {
  id: string;
  name: { ja: string; en: string };
  description: { ja: string; en: string };
  preview_color: string;
}

export type CreateInvoiceInput = Omit<Invoice, "id" | "created_at" | "updated_at">;
