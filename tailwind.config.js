module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      }
    }
  }
}

