/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d4af35",
        secondary: "#740001",
        "background-light": "#f8f7f6",
        "background-dark": "#201d12",
        "card-dark": "#2a271e",
        "gryffindor-red": "#740001",
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
