// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/terminal.css"],
  app: {
    head: {
      title: "Terminal Setup — amirah",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    },
  },
  tailwindcss: {
    config: {
      corePlugins: {
        preflight: false,
      },
    },
  },
})
