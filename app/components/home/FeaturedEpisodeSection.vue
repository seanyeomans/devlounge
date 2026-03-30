<template>
  <section class="space-y-4" aria-labelledby="featured-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2
        id="featured-heading"
        class="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        Featured episode
      </h2>
      <NuxtLink
        to="/podcast"
        class="text-sm font-medium text-indigo-300 hover:text-indigo-200"
      >
        All episodes →
      </NuxtLink>
    </div>

    <div
      v-if="episode"
      class="grid gap-6 rounded-2xl border border-white/10 bg-slate-900/50 p-6 lg:grid-cols-[1fr_280px] lg:items-center"
    >
      <div>
        <p class="text-xs font-medium uppercase tracking-wide text-indigo-300/90">
          Latest highlight
        </p>
        <h3 class="mt-2 text-2xl font-semibold tracking-tight text-white">
          <NuxtLink
            :to="episode.path"
            class="hover:text-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >
            {{ episode.title }}
          </NuxtLink>
        </h3>
        <p
          v-if="episode.description"
          class="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base"
        >
          {{ episode.description }}
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink
            :to="episode.path"
            class="inline-flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
          >
            Shownotes
          </NuxtLink>
          <a
            v-if="episode.youtubeId"
            :href="`https://www.youtube.com/watch?v=${episode.youtubeId}`"
            class="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
      <a
        v-if="episode.youtubeId"
        :href="`https://www.youtube.com/watch?v=${episode.youtubeId}`"
        class="group relative block overflow-hidden rounded-xl border border-white/10"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :src="`https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`"
          alt=""
          class="aspect-video w-full object-cover transition group-hover:opacity-90"
          loading="lazy"
        />
        <span
          class="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 transition group-hover:opacity-100"
        >
          <span
            class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur"
            >Play</span
          >
        </span>
      </a>
    </div>
    <p v-else class="text-sm text-slate-400">
      Publish your first episode in
      <code class="rounded bg-white/10 px-1 py-0.5 text-xs">content/podcast/</code>.
    </p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  episode: {
    path: string
    title: string
    description?: string | null
    youtubeId?: string | null
  } | null
}>()
</script>
