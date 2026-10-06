import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages는 https://cafephilia.github.io/nagoya-trip/ 하위 경로에서 열린다
export default defineConfig({
  base: '/nagoya-trip/',
  plugins: [vue()],
})
