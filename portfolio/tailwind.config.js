/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: { 850: '#1e293b', 900: '#0f172a', 950: '#020617' },
        teal: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
        gold: { 400: '#fbbf24', 500: '#f59e0b' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}