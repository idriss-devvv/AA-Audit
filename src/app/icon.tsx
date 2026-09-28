import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F3F6E",
          borderRadius: 7,
          color: "#F4EDE0",
          fontSize: 11,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -0.3,
        }}
      >
        A&amp;A
      </div>
    ),
    { ...size }
  );
}
