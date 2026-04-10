import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      disable: command === 'serve',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: 'Juana PWD UI',
        short_name: 'Juana',
        description: 'Progressive web app frontend for Juana.',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@common': path.resolve(__dirname, './src/common'),
      '@features': path.resolve(__dirname, './src/features'),
      '@router': path.resolve(__dirname, './src/router'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://localhost:8072',
        changeOrigin: false,
        secure: false,
      },
      '/api/v1': {
        target: 'http://localhost:8072',
        changeOrigin: false,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'vendor-state'
          }

          if (id.includes('i18next')) {
            return 'vendor-i18n'
          }

          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }

          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }

          if (
            id.includes('/react/') ||
            id.includes('\\react\\') ||
            id.includes('/react-dom/') ||
            id.includes('\\react-dom\\') ||
            id.includes('/scheduler/') ||
            id.includes('\\scheduler\\')
          ) {
            return 'vendor-react'
          }

          if (id.includes('msw') || id.includes('workbox-window')) {
            return 'vendor-ui'
          }

          return 'vendor-misc'
        },
      },
    },
  },
}))
