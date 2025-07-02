/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./js/main.js"
  ],
  theme: {
    extend: {
      colors: {
        'accent-green': '#81B29A',
        'accent-orange': '#E07A5F',
        'main-dark': '#3D405B',
        'main-light': '#F8F7F4'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
} 