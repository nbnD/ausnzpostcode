import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B2545",
        navy2: "#112d5e",
        coral: "#E8472A",
        green: "#2D6A4F",
        ash: "#F4F6F9",
        border: "#E2E6ED",
        text: "#1A1A2E",
        muted: "#6B7280",
        ice: "#A8BDD6",
        sky: "#7EAEE8",
        ink: "#1A1A2E",
        "ink-muted": "#6B7280",
        coast: "#0B2545",
        fern: "#2D6A4F",
        clay: "#E8472A",
        mist: "#F4F6F9",
        shell: "#FFFFFF"
      },
      fontFamily: {
        heading: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 12px 40px rgba(11, 37, 69, 0.14)",
        search: "0 8px 40px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.15)",
        coral: "0 4px 16px rgba(232,71,42,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
