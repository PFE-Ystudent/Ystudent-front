/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8', // --color-sky-400
        secondary: 'var(--color-secondary)', // --color-zinc-50
        selected: 'var(--color-selected)', // --color-sky-50
        body: 'var(--color-body)',
        color: 'var(--text-color)',
        muted: 'var(--text-muted)'
      },
      borderColor: {
        primary: '#00a6f4', // --color-sky-500
        secondary: 'var(--border-secondary)', // --color-zinc-300
        selected: '#00a6f4', // --color-sky-500
        muted: 'var(--text-muted)'
      },
      divideColor: {
        secondary: 'var(--border-secondary)', // --color-zinc-300
      },
      backgroundColor: {
        color: 'var(--bg-color)',
        selected: 'var(--color-selected)', // --color-sky-50
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

