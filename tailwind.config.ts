import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Beige — sable doux, fonds et surfaces chaleureuses
        beige: {
          50: "#F9F6F0",
          100: "#F2EDE3",
          200: "#E6DECF",
          300: "#D3C6AE",
          400: "#B8A583",
          500: "#998462",
        },
        // Bleu — encre profonde : marque, actions, éléments de confiance
        blue: {
          50: "#EEF2F8",
          100: "#DCE5F1",
          200: "#BACBE3",
          300: "#8DA7CC",
          400: "#5B7FB2",
          500: "#35598F",
          600: "#1F3F6E",
          700: "#172F54",
          800: "#10223E",
          900: "#0B1729",
        },
        // Gris — graphite neutre pour le texte et les structures
        ink: {
          900: "#17191D",
          800: "#25282E",
          700: "#3B3F46",
          600: "#51555D",
          500: "#6A6E76",
          400: "#8B8E95",
          300: "#B3B5BA",
          200: "#D6D7DA",
          100: "#ECECEE",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23, 25, 29, 0.04), 0 8px 24px -12px rgba(23, 25, 29, 0.10)",
        lift: "0 1px 2px rgba(23, 25, 29, 0.05), 0 24px 48px -20px rgba(16, 34, 62, 0.25)",
        ring: "0 0 0 1px rgba(23, 25, 29, 0.06)",
        "inner-top": "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "50%": { transform: "translateY(16px) translateX(-14px) scale(1.05)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "grow-x": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        scan: "scan 3.6s cubic-bezier(0.45,0,0.55,1) infinite",
        marquee: "marquee 28s linear infinite",
        "grow-x": "grow-x 1.1s cubic-bezier(0.22,1,0.36,1) both",
        "pop-in": "pop-in 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
