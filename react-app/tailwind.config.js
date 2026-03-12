/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1d5fa3',
        secondary: '#0d9488',
        'primary-light': '#60a5fa',
        'secondary-light': '#2dd4bf',
        dark: '#0f172a',
        accent: '#d97706',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
