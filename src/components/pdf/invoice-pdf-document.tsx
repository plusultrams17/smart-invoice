"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";

// Register Noto Sans JP for Japanese text support
Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.1/files/noto-sans-jp-japanese-400-normal.woff",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.1/files/noto-sans-jp-japanese-700-normal.woff",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9,
    padding: 40,
    color: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#2563eb",
  },
  senderInfo: {
    textAlign: "right",
  },
  senderName: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  senderDetail: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 1,
  },
  clientSection: {
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    padding: 14,
    marginBottom: 20,
  },
  clientLabel: {
    fontSize: 7,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 7,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 10,
    fontWeight: 700,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 7,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  colDescription: { flex: 5 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 2, textAlign: "right" },
  colAmount: { flex: 2, textAlign: "right" },
  totals: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 200,
    paddingVertical: 3,
  },
  totalLabel: {
    flex: 1,
    color: "#6b7280",
  },
  totalValue: {
    width: 80,
    textAlign: "right",
  },
  totalFinal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 200,
    paddingVertical: 6,
    borderTopWidth: 2,
    borderTopColor: "#2563eb",
    marginTop: 4,
  },
  totalFinalLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: 700,
  },
  totalFinalValue: {
    width: 80,
    textAlign: "right",
    fontSize: 13,
    fontWeight: 700,
    color: "#2563eb",
  },
  notes: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 14,
  },
  notesLabel: {
    fontSize: 7,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 8,
    color: "#6b7280",
    lineHeight: 1.5,
  },
});

function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

interface InvoicePdfDocumentProps {
  invoice: Invoice;
}

export function InvoicePdfDocument({ invoice }: InvoicePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>請求書</Text>
            <Text style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>
              {invoice.invoice_number}
            </Text>
          </View>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>
              {invoice.sender_company || invoice.sender_name}
            </Text>
            <Text style={styles.senderDetail}>{invoice.sender_name}</Text>
            <Text style={styles.senderDetail}>{invoice.sender_email}</Text>
            <Text style={styles.senderDetail}>{invoice.sender_address}</Text>
            {invoice.sender_registration_number && (
              <Text style={styles.senderDetail}>
                登録番号: {invoice.sender_registration_number}
              </Text>
            )}
          </View>
        </View>

        {/* Client */}
        <View style={styles.clientSection}>
          <Text style={styles.clientLabel}>請求先</Text>
          <Text style={styles.clientName}>{invoice.client_company}</Text>
          <Text style={{ fontSize: 9, color: "#4b5563" }}>
            {invoice.client_name} 様
          </Text>
          <Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2 }}>
            {invoice.client_address}
          </Text>
        </View>

        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>発行日</Text>
            <Text style={styles.metaValue}>{invoice.issued_date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>支払期限</Text>
            <Text style={styles.metaValue}>{invoice.due_date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>合計金額</Text>
            <Text style={[styles.metaValue, { color: "#2563eb", fontSize: 12 }]}>
              {formatCurrency(invoice.total)}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>
              品目・内容
            </Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>数量</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>単価</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>金額</Text>
          </View>
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                {formatCurrency(item.unit_price)}
              </Text>
              <Text style={[styles.colAmount, { fontWeight: 700 }]}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>小計</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.subtotal)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>消費税 ({invoice.tax_rate}%)</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.tax_amount)}
            </Text>
          </View>
          <View style={styles.totalFinal}>
            <Text style={styles.totalFinalLabel}>合計</Text>
            <Text style={styles.totalFinalValue}>
              {formatCurrency(invoice.total)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>備考</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
