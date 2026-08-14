import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          900: "#0f172a",
        },
        gold: {
          400: "rgb(var(--color-gold-400) / <alpha-value>)",
          500: "#f59e0b",
          600: "#d97706",
        },
        canal: {
          blue: "rgb(var(--color-canal-blue) / <alpha-value>)",
          primary: "rgb(var(--color-canal-primary) / <alpha-value>)",
          ink: "rgb(var(--color-canal-ink) / <alpha-value>)",
          navy: "#091b3d",
          azure: "#0ea5e9",
          royal: "#2563eb",
          sapphire: "#1d4ed8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 15% 25%, rgba(37,99,235,0.28) 0, transparent 45%), radial-gradient(circle at 85% 15%, rgba(14,165,233,0.30) 0, transparent 45%), radial-gradient(circle at 50% 85%, rgba(9,27,61,0.40) 0, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(37, 99, 235, 0.35)",
        "blue-glow": "0 0 35px -5px rgba(14, 165, 233, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
