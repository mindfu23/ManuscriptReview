/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soothing eucalyptus/sage palette for Manuscript Koala
        primary: {
          50: '#f6f9f7',
          100: '#e8f0eb',
          200: '#d1e2d8',
          300: '#a8c9b5',
          400: '#7aab8d',
          500: '#5a9270',
          600: '#47785b',
          700: '#3b614a',
          800: '#324f3e',
          900: '#2a4134',
        },
        // Warm accent for highlights
        accent: {
          50: '#fef9f3',
          100: '#fdf0e1',
          200: '#fbe0c3',
          300: '#f7c99a',
          400: '#f2a86e',
          500: '#ed8c4a',
          600: '#de7030',
          700: '#b85726',
          800: '#934626',
          900: '#773c23',
        },
      },
    },
  },
  plugins: [],
}
