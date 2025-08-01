/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../packages/cross-ui-toolkit/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        'clash': ['ClashDisplay', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
