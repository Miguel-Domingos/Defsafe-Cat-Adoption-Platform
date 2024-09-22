import CustomTheme from "./theme/PrimevueCustomTheme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/supabase",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: "200..700",
        },
      },
    ],
    "@nuxt/icon",
  ],
  primevue: {
    options: {
      theme: {
        preset: CustomTheme,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
  },
  supabase: {
    redirect: false,
  },
});
