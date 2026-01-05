/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'pintado': '#66BB6A',
        'fosteado': '#FFE6AA',
        'inyectado': '#FF6B9D',
        'horneado': '#FFA726',
        'glaceado': '#4FC3F7',
      },
    },
  },
  plugins: [],
}