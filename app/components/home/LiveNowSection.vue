<template>
  <section class="space-y-4" aria-labelledby="live-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2
          id="live-heading"
          class="text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          {{ heading }}
        </h2>
        <p class="mt-1 text-sm text-slate-400">
          {{ subheading }}
        </p>
      </div>
      <a
        v-if="channelUrl"
        :href="channelUrl"
        class="text-sm font-medium text-indigo-300 hover:text-indigo-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open YouTube channel ↗
      </a>
    </div>

    <div
      class="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl shadow-black/40"
    >
      <iframe
        v-if="embedSrc"
        :src="embedSrc"
        class="h-full w-full"
        title="DevLounge video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <div
        v-else
        class="flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <p class="text-sm text-slate-300">
          No embed available yet. Add
          <code class="rounded bg-white/10 px-1 py-0.5 text-xs"
            >NUXT_PUBLIC_YOUTUBE_CHANNEL_ID</code
          >
          or publish an episode with a
          <code class="rounded bg-white/10 px-1 py-0.5 text-xs">youtubeId</code>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** Latest episode YouTube id when offline — used as embed fallback */
  fallbackYoutubeId?: string | null
}>()

const config = useRuntimeConfig()

const { data: live } = await useLiveBroadcast()

const heading = computed(() =>
  live.value?.live ? 'Live now' : 'Video',
)

const subheading = computed(() =>
  live.value?.live
    ? 'You are watching the DevLounge live stream.'
    : 'Latest on YouTube — or subscribe for the next live show.',
)

const channelUrl = computed(() => {
  const id = live.value?.channelId || config.public.youtubeChannelId
  return id ? `https://www.youtube.com/channel/${id}` : null
})

const embedSrc = computed(() => {
  if (live.value?.live && live.value.embedUrl) return live.value.embedUrl
  const id = props.fallbackYoutubeId
  if (id) return `https://www.youtube.com/embed/${id}`
  return null
})
</script>
