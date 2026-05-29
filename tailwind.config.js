/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F8F5EE",
        soft: "#F7F8FA",
        ink: "#191F28",
        muted: "#6B7684",
        line: "#E5E8EB",
        sage: "#51685A",
        toss: "#3182F6",
        gold: "#B08642",
        rust: "#A1503A",
      },
      boxShadow: {
        phone: "0 32px 80px rgba(25, 31, 40, 0.18)",
        card: "0 14px 35px rgba(25, 31, 40, 0.08)",
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
