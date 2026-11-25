import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1B3D",
        paper: "#FBF8F1",
        mist: "#E9EEF6",
        saffron: "#F2A33A",
        "saffron-ink": "#8A5410", // saffron dark enough for text on light backgrounds (AA)
        leaf: "#2F9E6E",
        "leaf-ink": "#23805A", // leaf dark enough for text / white-on-green (AA)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-tamil)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "var(--font-tamil)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
