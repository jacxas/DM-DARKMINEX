/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mine': {
          950: '#050505',
          900: '#0a0a0a',
          800: '#151515',
          700: '#202020',
          600: '#2d2d2d',
          500: '#404040',
        },
        'amber-glow': '#ff9d00',
        'blood-red': '#880000',
      }
    },
  },
  plugins: [],
}
