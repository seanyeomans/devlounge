export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const videoId = config.public.liveVideoId?.trim()
  const live = Boolean(config.public.liveNow && videoId)

  return {
    live,
    videoId: live ? videoId : null,
    embedUrl: live && videoId ? `https://www.youtube.com/embed/${videoId}` : null,
    channelId: config.public.youtubeChannelId || null,
  }
})
