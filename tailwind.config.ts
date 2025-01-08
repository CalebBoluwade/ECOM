/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./public/**/*.html",
    "./app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{html,js,ts,jsx,tsx,mdx}",
    './layouts/**/*.{html,js,ts,tsx,mdx}',
    "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
