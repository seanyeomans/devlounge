<template>
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="space-y-2">
      <h1 class="text-3xl font-semibold tracking-tight text-white">
        Your account
      </h1>
      <p class="text-sm text-slate-400">
        Signed in as
        <span class="text-slate-200">{{ user?.email }}</span>
      </p>
    </header>

    <section
      v-if="pending"
      class="mt-10 text-sm text-slate-400"
      aria-busy="true"
    >
      Loading profile…
    </section>

    <form
      v-else
      class="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/40 p-6"
      @submit.prevent="save"
    >
      <h2 class="text-lg font-medium text-white">Profile</h2>

      <div>
        <label
          for="pf-name"
          class="block text-sm font-medium text-slate-300"
          >Display name</label
        >
        <input
          id="pf-name"
          v-model="form.display_name"
          type="text"
          maxlength="80"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <div>
        <label for="pf-bio" class="block text-sm font-medium text-slate-300"
          >Bio</label
        >
        <textarea
          id="pf-bio"
          v-model="form.bio"
          rows="4"
          maxlength="2000"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          placeholder="A few lines about you…"
        />
      </div>

      <div>
        <label
          for="pf-avatar"
          class="block text-sm font-medium text-slate-300"
          >Avatar URL</label
        >
        <input
          id="pf-avatar"
          v-model="form.avatar_url"
          type="url"
          class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          placeholder="https://…"
        />
        <p class="mt-1 text-xs text-slate-500">
          Optional image URL (uploads can be added later).
        </p>
      </div>

      <p v-if="memberSince" class="text-xs text-slate-500">
        Member since {{ memberSince }}
      </p>

      <p v-if="saveErr" class="text-sm text-rose-300" role="alert">
        {{ saveErr }}
      </p>
      <p v-if="saveOk" class="text-sm text-emerald-300" role="status">
        Profile saved.
      </p>

      <div class="flex flex-wrap gap-3">
        <button
          type="submit"
          class="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-60"
          :disabled="saving"
        >
          {{ saving ? 'Saving…' : 'Save profile' }}
        </button>
        <button
          type="button"
          class="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5"
          @click="signOut"
        >
          Sign out
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const user = useSupabaseUser()
const client = useSupabaseClient()
const { profile, pending, update } = useProfile()

useSiteSeo({
  title: 'Account',
  description: 'Manage your DevLounge member profile.',
  path: '/account',
})

const form = reactive({
  display_name: '',
  bio: '',
  avatar_url: '',
})

watch(
  profile,
  (p) => {
    if (!p) return
    form.display_name = p.display_name ?? ''
    form.bio = p.bio ?? ''
    form.avatar_url = p.avatar_url ?? ''
  },
  { immediate: true },
)

const memberSince = computed(() => {
  const raw = profile.value?.created_at
  if (!raw) return null
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const saving = ref(false)
const saveErr = ref('')
const saveOk = ref(false)

async function save() {
  saveErr.value = ''
  saveOk.value = false
  saving.value = true
  try {
    const { error } = await update({
      display_name: form.display_name.trim() || null,
      bio: form.bio.trim() || null,
      avatar_url: form.avatar_url.trim() || null,
    })

    if (error) {
      saveErr.value = error.message
      return
    }
    saveOk.value = true
  } finally {
    saving.value = false
  }
}

async function signOut() {
  await client.auth.signOut()
  await navigateTo('/')
}
</script>
