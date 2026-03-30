// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',

  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://devlounge.ca',
    name: process.env.NUXT_PUBLIC_SITE_NAME || 'DevLounge',
  },

  sitemap: {
    defaults: {
      changefreq: 'weekly',
      priority: 0.6,
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://devlounge.ca',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'DevLounge',
      youtubeChannelId: process.env.NUXT_PUBLIC_YOUTUBE_CHANNEL_ID || '',
      liveNow:
        String(process.env.NUXT_PUBLIC_LIVE_NOW || 'false').toLowerCase() ===
        'true',
      liveVideoId: process.env.NUXT_PUBLIC_LIVE_VIDEO_ID || '',
    },
    newsletterProviderSecret: process.env.NEWSLETTER_PROVIDER_SECRET || '',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-CA' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/podcast/**': { swr: 3600 },
    '/resources/**': { swr: 3600 },
    '/news/**': { swr: 900 },
    '/partners': { prerender: true },
  },
})
