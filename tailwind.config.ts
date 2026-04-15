import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        juana: {
          purple: {
            300: '#C4B5FD',
            500: '#7C3AED',
            700: '#5B21B6',
            DEFAULT: '#7C3AED',
          },
          gold: {
            400: '#FBBF24',
            500: '#F59E0B',
            DEFAULT: '#FBBF24',
          },
          bg: {
            900: '#111113',
            950: '#09090B',
            DEFAULT: '#09090B',
          },
          surface: {
            600: '#3F3F46',
            700: '#27272A',
            800: '#1C1C1F',
            DEFAULT: '#1C1C1F',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#A1A1AA',
            muted: '#52525B',
          },
          border: '#3F3F46',
          'purple-light': '#C4B5FD',
          'purple-dark': '#5B21B6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'juana-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'juana-gold': '0 0 20px rgba(251, 191, 36, 0.2)',
      },
      backgroundImage: {
        'juana-radial': 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15) 0%, transparent 60%)',
        'juana-accent': 'radial-gradient(ellipse at bottom right, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
      },
    },
  },
  plugins: [forms],
}

export default config
