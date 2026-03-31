<template>
  <div class="mx-auto max-w-md px-4 py-16 sm:px-6">
    <h1 class="text-2xl font-semibold tracking-tight text-white">
      Sign in
    </h1>
    <p class="mt-2 text-sm text-slate-400">
      Member accounts for DevLounge — manage your profile and preferences.
    </p>

    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <div>
        <label
          for="login-email"
          class="block text-sm font-medium text-slate-300"
          >Email</label
        >
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>
      <div>
        <label
          for="login-password"
          class="block text-sm font-medium text-slate-300"
          >Password</label
        >
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <p v-if="err" class="text-sm text-rose-300" role="alert">{{ err }}</p>

      <button
        type="submit"
        class="w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:opacity-60"
        :disabled="loading"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-400">
      No account yet?
      <NuxtLink to="/register" class="font-medium text-indigo-300 hover:text-indigo-200">
        Create one
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

useSiteSeo({
  title: 'Sign in',
  description: 'Sign in to your DevLounge member account.',
  path: '/login',
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const err = ref('')

const safeRedirect = computed(() => {
  const r = route.query.redirect
  if (typeof r !== 'string' || !r.startsWith('/')) return '/account'
  return r
})

watch(
  () => user.value,
  (u) => {
    if (u) navigateTo(safeRedirect.value)
  },
  { immediate: true },
)

async function submit() {
  err.value = ''
  loading.value = true
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value,
    })
    if (error) {
      err.value = error.message
      return
    }
    await navigateTo(safeRedirect.value)
  } finally {
    loading.value = false
  }
}
</script>
