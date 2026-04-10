import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        juana: {
          purple: '#534AB7',
          'purple-light': '#AFA9EC',
          'purple-dark': '#26215C',
          gold: '#EF9F27',
          bg: '#0a0a0f',
          surface: '#0d0d16',
          border: '#1e1e2e',
          text: {
            primary: '#e8e4dc',
            muted: '#5a5a7a',
          },
        },
      },
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
}

export default config
