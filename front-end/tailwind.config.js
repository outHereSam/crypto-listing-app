/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-mode-bg": "#19181A",
        "dark-mode-bg-lighter": "#1C1B1D",
        "light-mode-bg": "#F9FAFC",
        "dark-mode-text": "#E3E3E3",
      },
    },
  },
  plugins: [],
};
