<template>
  <section class="space-y-4" aria-labelledby="latest-episodes-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2
        id="latest-episodes-heading"
        class="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        Latest episodes
      </h2>
      <NuxtLink
        to="/podcast"
        class="text-sm font-medium text-indigo-300 hover:text-indigo-200"
      >
        Archive →
      </NuxtLink>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <PodcastEpisodeCard
        v-for="ep in episodes"
        :key="ep.path"
        :episode="ep"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  episodes: Array<{
    path: string
    title: string
    description?: string | null
    date?: Date | string | null
    duration?: string | null
    youtubeId?: string | null
  }>
}>()
</script>
