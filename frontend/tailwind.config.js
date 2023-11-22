/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkest: "#C4DFDF",
        semi: "D2E9E9",
        lighter: "#E3F4F4",
        light: "#F8F6F4",
        typo: "#579BB1"
      },
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
