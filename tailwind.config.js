/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primaryText: "#171A1C",
        brandGreen: "#00523D",
        progressRed: "#EF4444",
        progressOrange: "#F28D15",
        progressGreen: "#22C322",
        deepEmerald: "#00664D",
        borderGreen: "#08916F",
        borderGray: "#ABB2BA",
        emerald700: "#047857",
        green200: "#A7F3D0",
        gray400: "#9CA3AF",
        errorRed: "#FFB199",
      },
      fontSize: {
        xs: "12px",
      },
    },
  },
  plugins: [],
};
