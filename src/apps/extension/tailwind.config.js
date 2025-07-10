
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./entrypoints/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../packages/cross-ui-toolkit/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
  darkMode: "class",
};
