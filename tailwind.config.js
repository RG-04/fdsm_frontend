/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        torange: {
          50: "#ffb9a6",
          100: "#ff9c82",
          200: "#ff8e70",
          300: "#ff805e",
          400: "#ff724c",
          500: "#e66744",
          600: "#cc5b3d",
          700: "#b35035",
          DEFAULT: "#ff724c",
        },
        tyellow: {
          50: "#fedfa8",
          100: "#fed285",
          200: "#fdcc73",
          300: "#fdc562",
          400: "#fdbf50",
          500: "#e4ac48",
          600: "#ca9940",
          700: "#b18638",
          DEFAULT: "#fdbf50",
        },
        twhite: "#f4f4f8",
        tblack: {
          50: "#9596a0",
          100: "#6a6b7a",
          200: "#555667",
          300: "#3f4154",
          400: "#2a2c41",
          500: "#26283b",
          600: "#222334",
          700: "#1d1f2e",
          DEFAULT: "#26283b",
        },
      },

      margin: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
      },
    },
  },
  plugins: [],
};
