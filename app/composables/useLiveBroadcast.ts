export interface LiveBroadcastPayload {
  live: boolean
  videoId: string | null
  embedUrl: string | null
  channelId: string | null
}

export function useLiveBroadcast() {
  return useFetch<LiveBroadcastPayload>('/api/live', {
    key: 'live-broadcast',
    default: () => ({
      live: false,
      videoId: null,
      embedUrl: null,
      channelId: null,
    }),
  })
}
