import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: "#fff8eb",
          100: "#fdeacc",
          700: "#9a6215",
          800: "#7e4f11",
          900: "#5e3a0b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
