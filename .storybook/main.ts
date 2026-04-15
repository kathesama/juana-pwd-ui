import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { fileURLToPath } from 'url'

const storybookDir = path.dirname(fileURLToPath(import.meta.url))

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
          '@': path.resolve(storybookDir, '../src'),
          '@app': path.resolve(storybookDir, '../src/app'),
          '@common': path.resolve(storybookDir, '../src/common'),
          '@features': path.resolve(storybookDir, '../src/features'),
          '@router': path.resolve(storybookDir, '../src/router'),
          '@store': path.resolve(storybookDir, '../src/store'),
          '@styles': path.resolve(storybookDir, '../src/styles'),
          '@mocks': path.resolve(storybookDir, '../src/mocks'),
          '@assets': path.resolve(storybookDir, '../src/assets'),
          '@i18n': path.resolve(storybookDir, '../src/i18n'),
        },
      },
    })
  },
}

export default config
