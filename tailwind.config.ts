import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Beige — fond neutre et chaleureux
        beige: {
          50: "#FBF8F3",
          100: "#F5EEE3",
          200: "#EAE0CC",
          300: "#D8C7A1",
          400: "#C3AC7C",
        },
        // Bleu — marque, actions, éléments de confiance
        blue: {
          50: "#EAF1F8",
          100: "#D3E3F2",
          400: "#5B84B1",
          500: "#2F5D8C",
          600: "#1F3A5F",
          700: "#152A45",
        },
        // Texte — brun-noir chaud plutôt que noir pur, plus doux avec le beige
        ink: {
          900: "#262420",
          700: "#3F3B34",
          500: "#6B6459",
          300: "#A69E8F",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(31, 58, 95, 0.08)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "50%": { transform: "translateY(16px) translateX(-14px) scale(1.05)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
