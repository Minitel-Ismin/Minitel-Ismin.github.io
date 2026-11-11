import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Image d'aperçu affichée quand on partage un lien du site.
// Générée au build en `out/og.png` (référencée dans app/layout.tsx).
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(900px 500px at 85% 0%, #1b3a0c 0%, #0f110f 70%)",
          color: "#e7ebe4",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#69ff0a", letterSpacing: 4 }}>
          › {site.accroche.toUpperCase()}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
          <div style={{ fontSize: 170, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>
            {site.nom}
          </div>
          <div style={{ width: 70, height: 120, background: "#69ff0a", marginBottom: 14 }} />
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9ba597" }}>
          Campus Georges Charpak · Gardanne · depuis {site.fondation}
        </div>
      </div>
    ),
    size,
  );
}
