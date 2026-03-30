<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="max-w-2xl space-y-3">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Podcast
      </h1>
      <p class="text-slate-300">
        Video episodes on YouTube with full shownotes and chapters here.
      </p>
    </header>

    <div class="mt-10 grid gap-4 md:grid-cols-2">
      <PodcastEpisodeCard
        v-for="ep in episodes"
        :key="ep.path"
        :episode="ep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'Podcast episodes',
  description: 'All DevLounge podcast episodes with shownotes and YouTube links.',
  path: '/podcast',
})

const { data: episodes } = await useAsyncData('podcast-list-all', () =>
  queryCollection('episodes')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all(),
)
</script>
