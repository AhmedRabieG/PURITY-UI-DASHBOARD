import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'path'
// import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vueI18n from '@intlify/unplugin-vue-i18n/vite'



// import vueDevTools from 'vite-plugin-vue-devtools'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// console.log("__filename", __filename)
// console.log("__dirname", __dirname)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue( {
      script: {
        defineModel: true
      }
    }),
    // VueI18nPlugin({
    //   include: path.resolve(__dirname, "./src/locales/**"), 
    // }),
    vueI18n({
      include: resolve(__dirname, './src/locales/**'),
    }),
    // vuetify({ autoImport: true, styles: "sass" }),
    vuetify({
      autoImport: true,
    }),
  ],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
