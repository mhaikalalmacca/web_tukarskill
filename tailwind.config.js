/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pasar: {
          deep: "#12302B",
          deep2: "#0D2622",
          paper: "#FBF3E3",
          paper2: "#F3E8D2",
          ochre: "#E0972A",
          ochreDark: "#8A5A15",
          berry: "#9C3B4E",
          berryDark: "#5E2130",
          leaf: "#3E7C59",
          leafDark: "#204731",
          ink: "#17211D",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
