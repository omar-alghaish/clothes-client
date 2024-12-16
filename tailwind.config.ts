import {
  tailwindColors,
  tailwindContainers,
  tailwindFonts,
  tailwindRadius,
  tailwindShadows,
} from "./src/config/tailwindConfig";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: tailwindContainers,
    extend: {
      fontFamily: tailwindFonts,
      colors: tailwindColors,
      borderRadius: tailwindRadius,
      boxShadow: tailwindShadows,
    },
  },
  plugins: [],
};
export default config;
