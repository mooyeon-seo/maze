import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        maze: {
          wall: "#2d3436",
          path: "#00b894",
          visited: "#74b9ff",
          current: "#ff7675",
          start: "#00cec9",
          end: "#fd79a8",
        },
      },
      keyframes: {
        "cell-visited": {
          "0%": { transform: "scale(0.3)", backgroundColor: "var(--visited-color)" },
          "50%": { transform: "scale(1.2)", backgroundColor: "var(--visited-color)" },
          "100%": { transform: "scale(1)", backgroundColor: "var(--visited-color)" },
        },
        "cell-path": {
          "0%": { transform: "scale(0.3)", backgroundColor: "var(--path-color)" },
          "50%": { transform: "scale(1.2)", backgroundColor: "var(--path-color)" },
          "100%": { transform: "scale(1)", backgroundColor: "var(--path-color)" },
        },
      },
      animation: {
        "cell-visited": "cell-visited 0.3s ease-out forwards",
        "cell-path": "cell-path 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;