/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"','sans-serif'],
        lineHeight: {
          'custom-26': '26px', // Custom line height of 26px
        },
      },
    },
  },
  plugins: [],
}

