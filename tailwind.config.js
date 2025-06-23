/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/*.js",
    "./admin-data.html"
  ],
  theme: {
    extend: {
      colors: {
        'accent-green': '#4ade80',
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