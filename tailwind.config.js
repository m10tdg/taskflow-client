/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B1F",
        paper: "#F7F7F5",
        surface: "#FFFFFF",
        line: "#E4E2DD",
        brand: {
          DEFAULT: "#3F6B5C",
          dark: "#2E5346",
          light: "#DCE9E4",
        },
        priority: {
          high: "#C0392B",
          highBg: "#FBE7E4",
          medium: "#B8871F",
          mediumBg: "#FBF1DD",
          low: "#3E7A57",
          lowBg: "#E1F0E7",
        },
        status: {
          todo: "#5B5A57",
          todoBg: "#EDECE8",
          progress: "#8A5A21",
          progressBg: "#FBEEDC",
          done: "#2E6B4F",
          doneBg: "#E0F0E8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
