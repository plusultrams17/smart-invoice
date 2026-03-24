import { NextResponse } from "next/server";
import { mockInvoices } from "@/lib/mock/invoices";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const invoice = mockInvoices.find((inv) => inv.id === id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  return NextResponse.json({ invoice });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const invoice = mockInvoices.find((inv) => inv.id === id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  const updated = { ...invoice, ...body, updated_at: new Date().toISOString() };
  return NextResponse.json({ invoice: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const invoice = mockInvoices.find((inv) => inv.id === id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
