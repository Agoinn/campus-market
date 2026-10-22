import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // 本地开发走根路径，构建时走 GitHub Pages 的子路径
  base: command === 'build' ? '/campus-market/' : '/',
  plugins: [
    vue(),
    // 扫描模板里的 <van-*> 标签，用到哪个组件才引入哪个组件和它的样式
    Components({
      resolvers: [VantResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
