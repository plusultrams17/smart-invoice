import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Smart Invoice - 建設・塗装業向けAI請求書作成ツール";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0fdf4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "#2563eb",
            marginBottom: "24px",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 13H8" />
            <path d="M16 13h-2" />
            <path d="M10 17H8" />
            <path d="M16 17h-2" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "12px",
            letterSpacing: "-1px",
          }}
        >
          Smart Invoice
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#4b5563",
            marginBottom: "40px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: "1.4",
          }}
        >
          建設・塗装業のためのAI請求書作成ツール
        </div>

        {/* Features row */}
        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          {[
            { label: "AI自動生成", value: "10秒" },
            { label: "入力時間削減", value: "87%" },
            { label: "月額", value: "¥1,980" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "white",
                borderRadius: "16px",
                padding: "20px 32px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#2563eb",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          14日間無料トライアル ・ インボイス制度対応 ・ クレジットカード不要
        </div>
      </div>
    ),
    { ...size }
  );
}
