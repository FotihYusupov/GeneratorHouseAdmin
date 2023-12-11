import { resolve } from 'path';

export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, '/'),
  },

  css: [
    '~/public/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: ["@nuxtjs/tailwindcss"]
});