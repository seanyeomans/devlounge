// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',

  modules: [
    '@nuxt/content',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
  ],

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

  supabase: {
    // Public site stays public; protect /account with app/middleware/auth.ts
    redirect: false,
    types: '~/types/database.types.ts',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
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
    // Avoid Nitro dev payload cache path collisions on nested routes.
    '/podcast/**': { ssr: true },
    '/resources/**': { ssr: true },
    '/news/**': { ssr: true },
    '/partners': { prerender: true },
    '/account/**': { ssr: true },
    '/confirm': { ssr: false },
  },
})
