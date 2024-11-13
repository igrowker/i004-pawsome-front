/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: "#6AB4A8",
        primaryDark: "#44887b",
        secondaryDark: "#B29F90",
        secondaryLight: "#D8C9B9",
        dark: "#08121F",
        light: "#F7FAFC",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // ya lo tienes configurado correctamente
      },
    },
    // Cambiar la fuente por defecto para todos los elementos
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],  // Cambiar la fuente por defecto
    },
  },
  plugins: [],
}
