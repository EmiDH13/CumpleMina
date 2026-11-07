/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#d25050'
      },
      screens: {
        xs: '380px',
        s:  '410px'
      },
    },
  },
  plugins: [],
}