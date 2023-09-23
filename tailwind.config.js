/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        themeDarkAuto: {
          light: '#0f172a',
          DEFAULT: '#0f172a',
          dark: '#f8fafc',
        },
        themeLightAuto: {
          light: '#f8fafc',
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
        },
        theme: {
          blue: '#2733ea',
          pink: '#ff6174',
        },
      },
      fontFamily: {
        sans: ['Lexend', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    function ({ addBase }) {
      addBase({
        '.scroll-hidden::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
