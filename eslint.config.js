import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const appFiles = ['src/**/*.{ts,tsx}']
const nodeFiles = ['vite.config.ts', 'vitest.config.ts', 'tailwind.config.ts', '.storybook/**/*.ts']

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'coverage', 'storybook-static', 'public/mockServiceWorker.js']),
  {
    files: [...appFiles, ...nodeFiles],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: ['./tsconfig.app.json', './tsconfig.node.json'] },
      },
    },
  },
  {
    files: appFiles,
    languageOptions: {
      ecmaVersion: 2024,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    rules: {
      'react/prop-types': 'off',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
    },
  },
  {
    files: nodeFiles,
    languageOptions: {
      ecmaVersion: 2024,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
