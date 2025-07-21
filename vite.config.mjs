/* eslint-env node */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue(),
    eslint({ cache: false })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/vitest.setup.js',
    include: ['tests/**/*.{test,spec}.{js,ts,vue}'],
    coverage: {
      reporter: ['text', 'html']
    },
  },
});
