<template>
  <section
    class="rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-950/80 via-slate-900/80 to-slate-950 p-6 sm:p-8"
    aria-labelledby="newsletter-heading"
  >
    <div class="max-w-xl">
      <h2
        id="newsletter-heading"
        class="text-xl font-semibold tracking-tight text-white sm:text-2xl"
      >
        Newsletter
      </h2>
      <p class="mt-2 text-sm text-slate-300 sm:text-base">
        New episodes, live show alerts, and a short dev digest — no spam.
      </p>
    </div>

    <form
      class="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
      @submit.prevent="onSubmit"
    >
      <label class="sr-only" for="newsletter-email">Email</label>
      <input
        id="newsletter-email"
        v-model="email"
        type="email"
        name="email"
        required
        autocomplete="email"
        placeholder="you@example.com"
        class="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
      <button
        type="submit"
        class="shrink-0 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="status === 'loading'"
      >
        {{ status === 'loading' ? 'Signing up…' : 'Subscribe' }}
      </button>
    </form>

    <p v-if="message" class="mt-3 text-sm" :class="messageClass" role="status">
      {{ message }}
    </p>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'loading' | 'ok' | 'error'>('idle')
const message = ref('')

const messageClass = computed(() =>
  status.value === 'ok' ? 'text-emerald-300' : 'text-rose-300',
)

async function onSubmit() {
  message.value = ''
  status.value = 'loading'
  try {
    const res = await $fetch<{ ok: boolean; message?: string }>(
      '/api/newsletter',
      {
        method: 'POST',
        body: { email: email.value, source: 'homepage' },
      },
    )
    if (res?.ok) {
      status.value = 'ok'
      message.value = res.message || "You're on the list."
      email.value = ''
    } else {
      throw new Error('Unexpected response')
    }
  } catch {
    status.value = 'error'
    message.value = 'Something went wrong. Try again in a moment.'
  }
}
</script>
