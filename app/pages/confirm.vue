<template>
  <div
    class="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6"
  >
    <p class="text-lg text-slate-200">Signing you in…</p>
    <p class="mt-2 text-sm text-slate-500">
      If nothing happens,
      <NuxtLink to="/login" class="text-indigo-300 hover:text-indigo-200"
        >go to sign in</NuxtLink
      >.
    </p>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

useSiteSeo({
  title: 'Confirm',
  description: 'Completing sign in.',
  path: '/confirm',
})

watch(
  () => user.value,
  (u) => {
    if (u) navigateTo('/account')
  },
  { immediate: true },
)
</script>
