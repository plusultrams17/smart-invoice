import { NextResponse } from "next/server";
import { mockInvoices } from "@/lib/mock/invoices";

export async function GET() {
  return NextResponse.json({ invoices: mockInvoices });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newInvoice = {
    id: `inv-${Date.now()}`,
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return NextResponse.json({ invoice: newInvoice }, { status: 201 });
}
