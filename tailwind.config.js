/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oregano: ['Oregano', 'cursive'],
        alice: ['Alice', 'serif'], // Add the font with a fallback
      },
    },
  },
  plugins: [],
}

