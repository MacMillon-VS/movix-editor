/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#f7f8f7',
        'background': '#080a11',
        'primary': '#64A451',
        'secondary': '#64A451',
        'accent': '#64a451',
       },
    },
  },
  plugins: [],
}