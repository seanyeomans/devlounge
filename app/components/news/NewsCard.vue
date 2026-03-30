<template>
  <article
    class="rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-sky-500/35 hover:bg-slate-900/70"
  >
    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
      <time v-if="dateLabel" :datetime="dateIso">{{ dateLabel }}</time>
      <span
        v-if="item.source"
        class="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
      >
        {{ item.source }}
      </span>
    </div>
    <h3 class="mt-2 text-base font-semibold text-white">
      <a
        v-if="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
      >
        {{ item.title }}
        <span class="ml-1 text-slate-500" aria-hidden="true">↗</span>
      </a>
      <NuxtLink
        v-else
        :to="item.path"
        class="hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
      >
        {{ item.title }}
      </NuxtLink>
    </h3>
    <p
      v-if="item.description"
      class="mt-2 line-clamp-2 text-sm text-slate-400"
    >
      {{ item.description }}
    </p>
    <NuxtLink
      v-if="item.link"
      :to="item.path"
      class="mt-3 inline-block text-sm text-slate-400 hover:text-white"
    >
      On-site summary
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: {
    path: string
    title: string
    description?: string | null
    date?: Date | string | null
    source?: string | null
    link?: string | null
  }
}>()

const dateIso = computed(() => {
  const d = props.item.date
  if (!d) return undefined
  const dt = typeof d === 'string' ? new Date(d) : d
  if (Number.isNaN(dt.getTime())) return undefined
  return dt.toISOString()
})

const dateLabel = computed(() => {
  const d = props.item.date
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
