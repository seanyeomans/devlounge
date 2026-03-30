<template>
  <ul
    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    role="list"
  >
    <li v-for="a in affiliates" :key="a.name">
      <a
        :href="a.url"
        target="_blank"
        rel="noopener noreferrer sponsored"
        class="flex h-full flex-col rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-amber-500/35 hover:bg-slate-900/70"
      >
        <div class="flex items-start justify-between gap-3">
          <p class="text-sm font-semibold text-white">{{ a.name }}</p>
          <span
            class="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200/90"
          >
            {{ a.tier === 'partner' ? 'Partner' : 'Affiliate' }}
          </span>
        </div>
        <p
          v-if="a.description"
          class="mt-2 text-sm text-slate-400"
        >
          {{ a.description }}
        </p>
        <span class="mt-4 text-xs text-slate-500">Visit site ↗</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  affiliates: Array<{
    name: string
    url: string
    description?: string | null
    tier?: 'partner' | 'affiliate' | null
  }>
}>()
</script>
