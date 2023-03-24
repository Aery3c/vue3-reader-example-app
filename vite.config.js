import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

const __DEV__ = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  base: __DEV__ ? '/' : '/vue3-reader/',
  plugins: [
    vue(),
    ElementPlus()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
