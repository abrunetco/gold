import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: colors.gray,
      indigo: colors.indigo,
      neutral: colors.neutral, // Used mainly for text color
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        400: "#facc15",
        500: "#eab308",
      }, // Accent colors, used mainly for star color, heading and buttons
      orange: {
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fb713b",
        400: "#fa5a15",
        500: "#e14d0b",
        600: "#ea580c",
      }, // Primary colors, used mainly for links, buttons and svg icons
      blue: colors.blue, // Used for bookmark icon
      red: colors.red, // Used for bookmark icon
      green: colors.green, // Used for bookmark icon
      zinc: colors.zinc, // Used mainly for box-shadow
    },
    extend: {
      fontFamily: {
        sans: ["Vazirmatn Variable", ...defaultTheme.fontFamily.sans],
        headings: ["Vazirmatn Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // require("tailwindcss/nesting"),
    // eslint-disable-next-line
    require("preline/plugin"),
    // eslint-disable-next-line
    require("@tailwindcss/forms"),
    // eslint-disable-next-line
    require("@tailwindcss/typography"),
    // eslint-disable-next-line
    require("tailwindcss/plugin")(function ({ addVariant }) {
      addVariant("dark-me", ".dark_&");
    }),
    // eslint-disable-next-line
    require("tailwindcss-rtl"),
  ],
};
