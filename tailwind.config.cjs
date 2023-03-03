/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", 'node_modules/daisyui/dist/**/*.{js,jsx,ts,tsx}', 'node_modules/react-daisyui/dist/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};