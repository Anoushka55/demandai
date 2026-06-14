import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EBDD",
        navy: {
          DEFAULT: "#2A2755",
          soft: "#3D3A6E",
          mute: "#5C5984",
        },
        coral: {
          DEFAULT: "#E0355C",
          soft: "#FBE3E8",
          dark: "#B82A4A",
        },
        teal: {
          DEFAULT: "#17A2A0",
          soft: "#E1F3F2",
          dark: "#108785",
        },
        success: "#2E8B57",
        warning: "#E8A33D",
        critical: "#D64545",
        info: "#2F6FED",
        muted: "#7A7390",
        ink: "#2A2755",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "flow-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "dash": {
          to: { strokeDashoffset: "-20" },
        },
      },
      animation: {
        "flow-right": "flow-right 3s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "dash": "dash 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
