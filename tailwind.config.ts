import type { Config } from "tailwindcss";

import tailwindTypography from "@tailwindcss/typography";
import tailwindAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily: {
      geist: ["Geist", "sans-serif"],
      halibut: ["Halibut", "sans-serif"],
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans],
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glow: {
          from: {
            "box-shadow":
              "0 0 1px #fff, 0 0 2px #fff, 0 0 20px #b49a04, 0 0 6px #b49a04, 0 0 8px #b49a04, 0 0 10px #b49a04, 0 0 12px #b49a04",
          },
          to: {
            "box-shadow":
              "0 0 1px #fff, 0 0 2px #f0dc6d, 0 0 6px #f0dc6d, 0 0 8px #f0dc6d, 0 0 10px #f0dc6d, 0 0 12px #f0dc6d, 0 0 14px #f0dc6d",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        glow: "glow 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [tailwindAnimate, tailwindTypography],
};

export default config;
