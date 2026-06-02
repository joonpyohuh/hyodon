/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        soft: "#F7F8FA",
        ink: "#191F28",
        muted: "#6B7684",
        line: "#E5E8EB",
        sage: "#3182F6",
        toss: "#3182F6",
        gold: "#4E8FF7",
        rust: "#A1503A",
      },
      boxShadow: {
        phone: "0 32px 90px rgba(25, 31, 40, 0.2)",
        card: "0 14px 35px rgba(49, 130, 246, 0.1)",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
