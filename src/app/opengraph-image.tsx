import { ImageResponse } from "next/og";
import { meta } from "@/content/copy";

export const alt = meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #F4EDE4 0%, #F6E6E3 55%, #D6F1F2 100%)",
          color: "#333333",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: "#E9A8A8" }} />
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#086062", fontFamily: "sans-serif", fontWeight: 700 }}>
            The Functional Desserts Program
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 1000 }}>{`${meta.ogTitle}.`}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#7B7777", fontFamily: "sans-serif", maxWidth: 1000 }}>
            {meta.ogDescription}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "sans-serif" }}>
          <div style={{ fontSize: 24, color: "#086062", fontWeight: 600 }}>leonors.com</div>
          <div style={{ fontSize: 22, color: "#333333", background: "#E9A8A8", padding: "12px 28px", borderRadius: 999, fontWeight: 700 }}>
            12 months of live mentorship
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
