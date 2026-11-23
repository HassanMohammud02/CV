/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          850: '#0E2038',
          900: '#0B192C',
          950: '#071120',
        },
        consulting: {
          emerald: '#047857',
          gold: '#B45309',
        },
      },
      boxShadow: {
        executive: '0 10px 30px -12px rgba(11, 25, 44, 0.12)',
      },
    },
  },
  plugins: [],
};
