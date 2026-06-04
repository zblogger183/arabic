import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#F97316",
        background: "#F8FAFC",
        "text-primary": "#1E293B",
        "text-secondary": "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
