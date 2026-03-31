<template>
  <div class="mx-auto max-w-md px-4 py-16 sm:px-6">
    <h1 class="text-2xl font-semibold tracking-tight text-white">
      Create account
    </h1>
    <p class="mt-2 text-sm text-slate-400">
      Join as a member to save and edit your profile.
    </p>

    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <div>
        <label
          for="reg-name"
          class="block text-sm font-medium text-slate-300"
          >Display name</label
        >
        <input
          id="reg-name"
          v-model="displayName"
          type="text"
          required
          maxlength="80"
          autocomplete="nickname"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>
      <div>
        <label
          for="reg-email"
          class="block text-sm font-medium text-slate-300"
          >Email</label
        >
        <input
          id="reg-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>
      <div>
        <label
          for="reg-password"
          class="block text-sm font-medium text-slate-300"
          >Password</label
        >
        <input
          id="reg-password"
          v-model="password"
          type="password"
          required
          minlength="8"
          autocomplete="new-password"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
        <p class="mt-1 text-xs text-slate-500">At least 8 characters.</p>
      </div>

      <p v-if="err" class="text-sm text-rose-300" role="alert">{{ err }}</p>
      <p v-if="info" class="text-sm text-emerald-300" role="status">{{ info }}</p>

      <button
        type="submit"
        class="w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:opacity-60"
        :disabled="loading || !!info"
      >
        {{ loading ? 'Creating…' : 'Create account' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-400">
      Already a member?
      <NuxtLink to="/login" class="font-medium text-indigo-300 hover:text-indigo-200">
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const config = useRuntimeConfig()

useSiteSeo({
  title: 'Create account',
  description: 'Create a DevLounge member account.',
  path: '/register',
})

const displayName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const err = ref('')
const info = ref('')

const siteUrl = computed(() =>
  String(config.public.siteUrl || '').replace(/\/$/, ''),
)

watch(
  () => user.value,
  (u) => {
    if (u) navigateTo('/account')
  },
  { immediate: true },
)

async function submit() {
  err.value = ''
  info.value = ''
  loading.value = true
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value.trim(),
      password: password.value,
      options: {
        data: { display_name: displayName.value.trim() },
        emailRedirectTo: siteUrl.value ? `${siteUrl.value}/confirm` : undefined,
      },
    })
    if (error) {
      err.value = error.message
      return
    }
    if (data.user && !data.session) {
      info.value =
        'Check your email to confirm your address, then sign in here.'
      return
    }
    await navigateTo('/account')
  } finally {
    loading.value = false
  }
}
</script>
