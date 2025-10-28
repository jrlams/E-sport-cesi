/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'minecraft-green': '#5DAD4E',
        'minecraft-brown': '#7C4F2E',
        'minecraft-gold': '#D4AF37',
        'minecraft-gray': '#E0E0E0',
        'minecraft-blue': '#3DB5E6',
        'minecraft-light-green': '#C6F68D',
      },
    },
  },
  plugins: [],
};
