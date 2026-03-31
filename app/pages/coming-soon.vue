<template>
  <div class="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
    <p class="text-sm font-medium uppercase tracking-wide text-indigo-300">
      DevLounge
    </p>
    <h1 class="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
      Coming soon
    </h1>
    <p class="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
      We are putting the final pieces in place for launch. Members can still sign in
      to access the platform during the rollout.
    </p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <NuxtLink
        to="/login"
        class="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
      >
        Member sign in
      </NuxtLink>
      <NuxtLink
        to="/register"
        class="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5"
      >
        Request access
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'Coming soon',
  description: 'DevLounge is almost ready. Members can sign in during rollout.',
  path: '/coming-soon',
})
</script>
