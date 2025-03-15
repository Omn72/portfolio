
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        space: {
          DEFAULT: '#0A0E17',
          50: '#0F1526',
          100: '#141A2E',
          200: '#1A2036',
          300: '#1F253E',
          400: '#252B47',
          500: '#2A304F',
          600: '#5B698F',
          700: '#8893B2',
          800: '#B5BCD0',
          900: '#DEE1EA',
        },
        neon: {
          blue: '#00F0FF',
          purple: '#9D4EDD',
          pink: '#FF3864',
          green: '#39FF14',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fadeOut': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'ufoFloat': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(-3deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(15px) rotate(3deg)' },
        },
        'ufoBeam': {
          '0%': { opacity: '0.4', height: '20px' },
          '50%': { opacity: '0.8', height: '80px' },
          '100%': { opacity: '0.4', height: '20px' },
        },
        'stars': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2000px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'fadeIn': 'fadeIn 0.5s ease forwards',
        'fadeOut': 'fadeOut 0.5s ease forwards',
        'ufoFloat': 'ufoFloat 8s ease-in-out infinite',
        'ufoBeam': 'ufoBeam 2s ease-in-out infinite',
        'stars': 'stars 50s linear infinite',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0A0E17, #151E33)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'neon-glow': 'linear-gradient(90deg, rgba(0, 240, 255, 0), rgba(0, 240, 255, 0.5), rgba(0, 240, 255, 0))',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(0, 240, 255, 0.3), 0 0 10px rgba(0, 240, 255, 0.2), 0 0 15px rgba(0, 240, 255, 0.1)',
        'neon-purple': '0 0 5px rgba(157, 78, 221, 0.3), 0 0 10px rgba(157, 78, 221, 0.2), 0 0 15px rgba(157, 78, 221, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
