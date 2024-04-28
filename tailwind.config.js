/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: '949px' },
      md: { min: '949px', max: '1199px' },
      xl: '1200px'
    },
    extend: {},
  },
  plugins: [],
}

