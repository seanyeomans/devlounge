<template>
  <footer class="border-t border-white/10 bg-slate-950">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <p class="text-sm font-medium text-white">DevLounge</p>
        <p class="mt-1 text-sm text-slate-400">
          Podcast, live builds, and practical notes for developers.
        </p>
      </div>
      <div class="flex flex-wrap gap-4 text-sm text-slate-400">
        <NuxtLink to="/podcast" class="hover:text-white"> Episodes </NuxtLink>
        <NuxtLink to="/resources" class="hover:text-white"> Resources </NuxtLink>
        <NuxtLink to="/news" class="hover:text-white"> News </NuxtLink>
        <NuxtLink to="/partners" class="hover:text-white"> Partners </NuxtLink>
      </div>
    </div>
    <div class="border-t border-white/5 py-4 text-center text-xs text-slate-500">
      © {{ year }} DevLounge. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
