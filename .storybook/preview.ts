import type { Preview } from '@storybook/react-vite'

import '../src/styles/globals.css'

const preview = {
  initialGlobals: {
    a11y: {
      manual: true,
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'juana-dark',
      values: [
        { name: 'juana-dark', value: '#0a0a0f' },
        { name: 'juana-surface', value: '#0d0d16' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
} satisfies Preview

export default preview
