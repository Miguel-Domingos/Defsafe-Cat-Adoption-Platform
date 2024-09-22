/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#4E2096",
          primary: "#26203B",
          stroke: "#DFE4E8",
          secundary: "#4D4E4E",
          placeholder: "#B2B2B2",
          danger: "#E03131",
          success: "#08D58B"
        },
      },
    },
    plugins: [],
  }
}
