/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8', // --color-sky-400
        secondary: '#fafafa', // --color-zinc-50
        selected: '#f0f9ff', // --color-sky-50
        body: '#fbfeff'
      },
      borderColor: {
        primary: '#00a6f4', // --color-sky-500
        secondary: '#d4d4d8', // --color-zinc-300
        selected: '#00a6f4' // --color-sky-500
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary': theme('colors.primary'),
          '--color-secondary': theme('colors.secondary'),
          '--color-selected': theme('colors.selected'),
          '--border-primary': theme('borderColor.primary'),
          '--border-secondary': theme('borderColor.secondary'),
          '--border-selected': theme('borderColor.selected'),
          '--color-body': theme('colors.body')
        }
      });
    }
  ],
}

