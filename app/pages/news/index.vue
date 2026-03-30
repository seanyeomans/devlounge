<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="max-w-2xl space-y-3">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Dev news
      </h1>
      <p class="text-slate-300">
        Short, curated items with optional outbound links. Heavier commentary
        lives on the podcast.
      </p>
    </header>

    <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewsNewsCard v-for="n in items" :key="n.path" :item="n" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'Developer news digest',
  description: 'Curated headlines and links for developers, from DevLounge.',
  path: '/news',
})

const { data: items } = await useAsyncData('news-list-all', () =>
  queryCollection('news')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all(),
)
</script>
