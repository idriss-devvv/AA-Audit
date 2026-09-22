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
          background: "linear-gradient(135deg, #FBF8F3 0%, #EAE0CC 100%)",
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
              background: "#1F3A5F",
              color: "#FBF8F3",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            PA
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#262420" }}>PayAudit</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#262420",
            maxWidth: 950,
          }}
        >
          Vérifiez chaque fiche de paie, sans rien laisser passer
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#6B6459", maxWidth: 850 }}>
          Détection automatique des anomalies, erreurs de cotisations et écarts sur vos bulletins
          de salaire.
        </div>
      </div>
    ),
    { ...size }
  );
}
