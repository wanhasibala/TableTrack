/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        white: "#fafafa",
        black: "#1d1d1d",
        primary: "#884405",
        secondary: "#c17604",
        tertiary: "#1f0302",
      },
    },
  },
  plugins: [],
};
