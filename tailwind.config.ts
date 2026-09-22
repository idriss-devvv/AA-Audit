import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FBF8F3",
          100: "#F5EEE3",
          200: "#EAE0CC",
          300: "#D8C7A1",
          400: "#C3AC7C",
        },
        blue: {
          50: "#EAF1F8",
          100: "#D3E3F2",
          400: "#5B84B1",
          500: "#2F5D8C",
          600: "#1F3A5F",
          700: "#152A45",
        },
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
    },
  },
  plugins: [],
};

export default config;
