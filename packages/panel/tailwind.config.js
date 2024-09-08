const { nextui } = require("@nextui-org/react");
const { withTV } = require("tailwind-variants/transformer");
/** @type {import('tailwindcss').Config} */
export default withTV({
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
});
