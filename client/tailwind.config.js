/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        'custom-drop':  '8px 5px 10px #000000'
      }
    },
  },
  plugins: [],
}