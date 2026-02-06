import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: {
            1: "#fdfcf0",
            2: "#f1f5f9",
            3: "#e0f2fe",
          },
          dark: {
            1: "#030712",
            2: "#0f172a",
            3: "#1e293b",
          },
        },
        primary: {
          DEFAULT: "#2563eb",
          dark: "#38bdf8",
        },
        accent: {
          DEFAULT: "#e11d48",
          dark: "#fb7185",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      borderRadius: {
        '3xl': '24px',
      },
      backgroundImage: {
        'liquid-light': 'linear-gradient(135deg, #fdfcf0 0%, #f1f5f9 50%, #e0f2fe 100%)',
        'liquid-dark': 'linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e293b 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
