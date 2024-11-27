/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./public/index.css"],
  theme: {
    extend: {
      boxShadow: {
        'all-around': '0 0 10px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
