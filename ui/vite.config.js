// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
let proxyHost = 'localhost'
let proxyPort = 8085
let proxy = `http://${proxyHost}:${proxyPort}`
const publicPath = '/AdminPanel/ui/'

// https://vitejs.dev/config/
export default defineConfig({
  base: publicPath,
  build: {
    outDir: '../src/BubotObj/OcfDevice/subtype/AdminPanel/static/ui/'
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/AdminPanel/api/': {
        target: proxy,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/AdminPanel/public_api/': {
        target: proxy,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/AdminPanel/i18n/': {
        target: proxy,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/AdminPanel/form/': {
        target: proxy,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/AdminPanel/ws': {
          target: `ws://${proxyHost}:${proxyPort}`,
          changeOrigin: true,
          ws: true
      },
      '/AuthService/': {
        target: proxy,
        changeOrigin: false,
        secure: false,
        ws: true,
      },
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },

})
