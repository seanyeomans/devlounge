<template>
  <article
    class="flex flex-col rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-indigo-500/40 hover:bg-slate-900/70"
  >
    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
      <time v-if="dateLabel" :datetime="dateIso">{{ dateLabel }}</time>
      <span
        v-if="episode.duration"
        class="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
      >
        {{ episode.duration }}
      </span>
    </div>
    <h3 class="mt-2 text-base font-semibold text-white">
      <NuxtLink
        :to="episode.path"
        class="hover:text-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
      >
        {{ episode.title }}
      </NuxtLink>
    </h3>
    <p
      v-if="episode.description"
      class="mt-2 line-clamp-2 text-sm text-slate-400"
    >
      {{ episode.description }}
    </p>
    <div class="mt-4 flex items-center gap-3">
      <NuxtLink
        :to="episode.path"
        class="text-sm font-medium text-indigo-300 hover:text-indigo-200"
      >
        Shownotes
      </NuxtLink>
      <a
        v-if="episode.youtubeId"
        :href="`https://www.youtube.com/watch?v=${episode.youtubeId}`"
        class="text-sm text-slate-400 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTube
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  episode: {
    path: string
    title: string
    description?: string | null
    date?: Date | string | null
    duration?: string | null
    youtubeId?: string | null
  }
}>()

const dateIso = computed(() => {
  const d = props.episode.date
  if (!d) return undefined
  const dt = typeof d === 'string' ? new Date(d) : d
  if (Number.isNaN(dt.getTime())) return undefined
  return dt.toISOString()
})

const dateLabel = computed(() => {
  const d = props.episode.date
  if (!d) return null
  const dt = typeof d === 'string' ? new Date(d) : d
  if (Number.isNaN(dt.getTime())) return null
  return dt.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>
