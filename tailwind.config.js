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
          deep: "#0B2E5C",       // navy tua — header & aksen gelap
          deep2: "#071F40",      // navy lebih gelap
          paper: "#FFFFFF",      // putih — background utama
          paper2: "#EAF2FB",     // biru sangat muda — background sekunder/card
          ochre: "#2F6FED",      // biru cerah — tombol/aksen utama
          ochreDark: "#1B4FBB",  // biru gelap — hover tombol
          berry: "#1CA7EC",      // biru langit — aksen chip
          berryDark: "#0E7DB8",
          leaf: "#5B8DEF",       // biru lembut — aksen chip alternatif
          leafDark: "#2F5FC4",
          ink: "#0B1B2B",        // teks utama, biru gelap hampir hitam
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        mono: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}