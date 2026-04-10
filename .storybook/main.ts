import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@app': path.resolve(__dirname, '../src/app'),
          '@common': path.resolve(__dirname, '../src/common'),
          '@features': path.resolve(__dirname, '../src/features'),
          '@router': path.resolve(__dirname, '../src/router'),
          '@store': path.resolve(__dirname, '../src/store'),
          '@styles': path.resolve(__dirname, '../src/styles'),
          '@mocks': path.resolve(__dirname, '../src/mocks'),
          '@assets': path.resolve(__dirname, '../src/assets'),
          '@i18n': path.resolve(__dirname, '../src/i18n'),
        },
      },
    })
  },
}

export default config
