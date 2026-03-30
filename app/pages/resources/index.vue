<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="max-w-2xl space-y-3">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Resources
      </h1>
      <p class="text-slate-300">
        Wiki-style notes: guides, snippets, and internal playbooks. Everything
        is versioned in git with typed front matter.
      </p>
    </header>

    <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ResourcesResourceCard
        v-for="r in resources"
        :key="r.path"
        :resource="r"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'Developer resources',
  description:
    'Guides, snippets, and curated references from the DevLounge community.',
  path: '/resources',
})

const { data: resources } = await useAsyncData('resources-list-all', () =>
  queryCollection('resources')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all(),
)
</script>
