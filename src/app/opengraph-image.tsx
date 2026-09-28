import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #F4EDE0 0%, #DDCFB4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1F3F6E",
              color: "#F4EDE0",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            A&amp;A
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#17191D" }}>A&A Audit</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#17191D",
            maxWidth: 950,
          }}
        >
          Vérifiez chaque fiche de paie, sans rien laisser passer
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#6A6E76", maxWidth: 850 }}>
          Détection automatique des anomalies, erreurs de cotisations et écarts sur vos bulletins
          de salaire.
        </div>
      </div>
    ),
    { ...size }
  );
}
