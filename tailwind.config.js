/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matte-black': '#1a1a1a',
        'matte-gray': '#2a2a2a',
        'matte-light-gray': '#3a3a3a',
        'matte-white': '#f8f8f8',
        'accent-green': '#00d4aa',
        'accent-red': '#ff6b6b',
        'accent-blue': '#4ecdc4',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 