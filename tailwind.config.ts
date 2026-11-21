import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090c",
        surface: "#0f1117",
        "surface-card": "#131620",
        "surface-border": "#232738",
        marvel: {
          50: "#fff1f1",
          100: "#ffdfdf",
          200: "#ffc5c5",
          300: "#ff9d9d",
          400: "#ff6464",
          500: "#e23636",
          600: "#cc1c1c",
          700: "#ab1212",
          800: "#8d1313",
          900: "#751515",
          950: "#410606",
        },
        doom: {
          gold: "#f59e0b",
          green: "#10b981",
          cyan: "#06b6d4",
          purple: "#8b5cf6",
        },
      },
      backgroundImage: {
        "marvel-gradient": "linear-gradient(135deg, #e23636 0%, #751515 100%)",
        "glow-gradient": "radial-gradient(ellipse at top, rgba(226, 54, 54, 0.15), transparent 70%)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
