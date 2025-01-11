import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules/**', 'dist/**'],
      cache: true,
    }),
  ],
  base: '/hacker-stories/',
})
