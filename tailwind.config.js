/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          bg: "#0A0A14",
          card: "#121124",
          cardHover: "#1B1933",
          border: "rgba(123, 97, 255, 0.15)",
          borderHover: "rgba(123, 97, 255, 0.4)",
          primary: "#7B61FF",
          primaryGlow: "rgba(123, 97, 255, 0.35)",
          cyan: "#00F5FF",
          cyanGlow: "rgba(0, 245, 255, 0.25)",
          purple: "#A855F7",
          text: "#F0EFF4",
          subtext: "#A3A1B8",
          muted: "#6B6A82",
          dark: "#06060C",
        }
      },
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'aura-sm': '0 0 15px -3px rgba(123, 97, 255, 0.25)',
        'aura-md': '0 0 30px -5px rgba(123, 97, 255, 0.35)',
        'aura-lg': '0 0 50px -10px rgba(123, 97, 255, 0.45)',
        'cyan-glow': '0 0 30px -5px rgba(0, 245, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'glowSpin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
