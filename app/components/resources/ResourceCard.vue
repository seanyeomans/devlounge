<template>
  <article
    class="rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-emerald-500/35 hover:bg-slate-900/70"
  >
    <p class="text-xs font-medium uppercase tracking-wide text-emerald-300/90">
      {{ resource.category }}
    </p>
    <h3 class="mt-2 text-base font-semibold text-white">
      <NuxtLink
        :to="resource.path"
        class="hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
      >
        {{ resource.title }}
      </NuxtLink>
    </h3>
    <p
      v-if="resource.description"
      class="mt-2 line-clamp-2 text-sm text-slate-400"
    >
      {{ resource.description }}
    </p>
    <div v-if="resource.tags?.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="tag in resource.tags"
        :key="tag"
        class="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  resource: {
    path: string
    title: string
    description?: string | null
    category: string
    tags?: string[] | null
  }
}>()
</script>
