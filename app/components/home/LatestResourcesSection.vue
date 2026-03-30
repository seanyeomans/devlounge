<template>
  <section class="space-y-4" aria-labelledby="latest-resources-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2
        id="latest-resources-heading"
        class="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        Latest resources
      </h2>
      <NuxtLink
        to="/resources"
        class="text-sm font-medium text-emerald-300 hover:text-emerald-200"
      >
        Browse wiki →
      </NuxtLink>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ResourcesResourceCard
        v-for="r in resources"
        :key="r.path"
        :resource="r"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  resources: Array<{
    path: string
    title: string
    description?: string | null
    category: string
    tags?: string[] | null
  }>
}>()
</script>
