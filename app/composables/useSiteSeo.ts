export function useSiteSeo(opts: {
  title?: string
  description?: string
  path?: string
}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
  const siteName = String(config.public.siteName || 'DevLounge')
  const path = opts.path ?? route.path ?? '/'
  const canonical = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  const title = opts.title ? `${opts.title} · ${siteName}` : siteName

  useSeoMeta({
    title,
    ogTitle: title,
    description: opts.description,
    ogDescription: opts.description,
    ogUrl: canonical,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
