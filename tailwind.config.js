/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      // Type scale from design tokens. Declared here rather than used as
      // text-[var(--t-x)], which Tailwind parses as a colour, not a size.
      fontSize: {
        display: ["var(--t-display)", { lineHeight: "1.08" }],
        h1: ["var(--t-h1)", { lineHeight: "1.15" }],
        h2: ["var(--t-h2)", { lineHeight: "1.2" }],
        h3: ["var(--t-h3)", { lineHeight: "1.35" }],
        body: ["var(--t-body)", { lineHeight: "1.65" }],
        small: ["var(--t-small)", { lineHeight: "1.6" }],
        fine: ["var(--t-fine)", { lineHeight: "1.5" }],
      },
      colors: {
        sinai: {
          50: "#e6f7fc",
          100: "#b3e8f7",
          200: "#80d9f2",
          300: "#4dc9ed",
          400: "#00AEEF",
          500: "#0099d6",
          600: "#007ab3",
          700: "#212070",
          800: "#1a1a5a",
          900: "#00002D",
          magenta: "#DC298D",
          violet: "#212070",
        },
        // Patient Guide accent pair — calm clinical patient-education feel,
        // anchored to Mount Sinai blue/violet with a warm amber for callouts.
        guide: {
          bg: "#f4f7fb",
          surface: "#ffffff",
          ink: "#10193a",
          line: "#dbe3f0",
          blue: "#00AEEF",
          violet: "#212070",
          navy: "#00002D",
          amber: "#b26a1a",
        },
      },
    },
  },
  plugins: [],
};
