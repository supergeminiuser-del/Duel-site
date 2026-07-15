import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07070B",
        secondary: "#101018",
        card: "#171724",
        border: "#2A2A3F",
        primary: "#7C5CFF",
        secondaryAccent: "#00D9FF",
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#EF4444",
      },
      borderRadius: {
        "2xl": "16px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;