/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6AB4A8",
        secondary: "#835251",
        accent1: "#B29F90",
        accent2: "#D8C9B9",
        dark: "#08121F",
        light: "#F7FAFC",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
