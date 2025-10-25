/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B97B48", 
        "brand-1": "#f7e6ca",
        "brand-2": "#e8d59e",
        "brand-3": "#d9bbb0",
        "brand-4": "#ad9c8e",
        "text-on-brand": "#2b2b2b",
      },
      maxWidth: {
        page: "1440px",
      },
      spacing: {
        header: "112px",
      },
    },
  },
  plugins: [],
};
