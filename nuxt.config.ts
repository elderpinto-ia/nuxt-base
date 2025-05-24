// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt'], // Ensure Pinia is here
  postcss: { // Add postcss config for tailwind
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
