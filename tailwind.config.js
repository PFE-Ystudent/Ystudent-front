/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8', // --color-sky-400
        secondary: '#fafafa', // --color-zinc-50
        selected: '#f0f9ff' // --color-sky-50
      },
      borderColor: {
        primary: '#00a6f4', // --color-sky-500
        secondary: '#d4d4d8', // --color-zinc-300
        selected: '#00a6f4' // --color-sky-500
      }
    },
  },
  plugins: [],
}

