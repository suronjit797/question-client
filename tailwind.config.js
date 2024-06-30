/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["JetBrains Mono"],
      },
      colors: {
        primary: "#254336",
        secondary: "#6B8A7A",
        accent: {
          DEFAULT: "#DAD3BE",
          hover: "#B7B597",
        },
      },
    },
  },
  plugins: [],
}

