import type { Config } from "tailwindcss";

const config: Config = {
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
        /* notification semantic colors */
        "notification-success": "#10b981",
        "notification-error": "#ef4444",
        "notification-warning": "#f59e0b",
        "notification-info": "#3b82f6",
        "notification-bg": "rgba(255,255,255,0.95)",
      },
      maxWidth: {
        page: "1440px",
      },
      boxShadow: {
        notification:
          "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        header: "112px",
      },
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        notificationSlideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        fadeSlideIn: "fadeSlideIn 0.3s ease-out",
        notificationSlideIn:
          "notificationSlideIn 0.3s cubic-bezier(0.4,0,0.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
