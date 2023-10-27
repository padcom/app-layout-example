import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import autoprefixer from 'autoprefixer'

// eslint-disable-next-line max-lines-per-function
export default defineConfig({
  plugins: [
    vue(),
    eslint({ lintOnStart: false }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
})
