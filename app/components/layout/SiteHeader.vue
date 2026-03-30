<template>
  <header
    class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
    >
      <NuxtLink
        to="/"
        class="group flex items-center gap-2 font-semibold tracking-tight text-white"
      >
        <span
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition group-hover:bg-indigo-400"
          >DL</span
        >
        <span class="text-base sm:text-lg">DevLounge</span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-1 text-sm text-slate-300 md:flex"
        aria-label="Primary"
      >
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white"
          active-class="bg-white/10 text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 md:hidden">
        <button
          type="button"
          class="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200"
          aria-expanded="false"
          aria-label="Open menu"
          @click="open = !open"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      v-if="open"
      class="border-t border-white/10 bg-slate-950 px-4 py-3 md:hidden"
    >
      <nav class="flex flex-col gap-1 text-sm" aria-label="Mobile">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-2 py-2 text-slate-200 hover:bg-white/5"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const open = ref(false)

const links = [
  { label: 'Podcast', to: '/podcast' },
  { label: 'Resources', to: '/resources' },
  { label: 'News', to: '/news' },
  { label: 'Partners', to: '/partners' },
] as const
</script>
