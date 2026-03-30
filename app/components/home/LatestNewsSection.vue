<template>
  <section class="space-y-4" aria-labelledby="latest-news-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2
        id="latest-news-heading"
        class="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        Dev news
      </h2>
      <NuxtLink
        to="/news"
        class="text-sm font-medium text-sky-300 hover:text-sky-200"
      >
        More headlines →
      </NuxtLink>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewsNewsCard v-for="n in items" :key="n.path" :item="n" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    path: string
    title: string
    description?: string | null
    date?: Date | string | null
    source?: string | null
    link?: string | null
  }>
}>()
</script>
