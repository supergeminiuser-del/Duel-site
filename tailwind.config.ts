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
        background: "#0A0A0A",
        secondary: "#121212",
        card: "#181818",
        border: "#262626",
        primary: "#FFFFFF", // Чистый белый для акцентов
        accent: "#00E676",  // Токсичный зеленый (как в FACEIT/CS)
        danger: "#FF1744",  // Красный
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        "2xl": "4px", // Острые углы вместо округлостей
      },
    },
  },
  plugins: [],
};
export default config;