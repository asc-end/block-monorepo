/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/cross-ui-toolkit/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        // Add your custom fonts here
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
