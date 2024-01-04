import { resolve } from 'path';

export default defineNuxtConfig({
  devServer: {
    port: 3001
  },
  server: {
    port: 3001
  },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css: [
    '~/public/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: ["@nuxtjs/tailwindcss"],
});