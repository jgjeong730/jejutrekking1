/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary: {
            DEFAULT: '#3182CE', // Example Blue
            50: '#EBF8FF',
            100: '#BEE3F8',
            500: '#3182CE',
            600: '#2B6CB0',
        }
      }
    },
  },
  plugins: [],
}
