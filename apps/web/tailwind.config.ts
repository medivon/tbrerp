import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        surface: "hsl(var(--surface))",
        subtle: "hsl(var(--subtle))",
        action: "hsl(var(--action))",
        accent: "hsl(var(--accent))",
        shell: {
          DEFAULT: "hsl(var(--shell))",
          border: "hsl(var(--shell-border))",
          foreground: "hsl(var(--shell-foreground))",
          muted: "hsl(var(--shell-muted))",
          surface: "hsl(var(--shell-surface))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          soft: "hsl(var(--primary-soft))",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23,35,31,0.06)",
        lifted: "0 14px 34px rgba(23,35,31,0.10)",
        shell: "0 18px 45px rgba(2,6,23,0.24)",
      },
      fontFamily: {
        sans: ["var(--font-thaiboran-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
