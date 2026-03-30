<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="max-w-2xl space-y-3">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Partners &amp; affiliates
      </h1>
      <p class="text-slate-300">
        We only list tools and services we would recommend without a referral
        link. Tracking parameters may be present where required by programs.
      </p>
    </header>

    <div class="mt-10">
      <PartnersAffiliateGrid v-if="affiliates?.length" :affiliates="affiliates" />
      <p v-else class="text-sm text-slate-400">
        Add JSON entries under
        <code class="rounded bg-white/10 px-1 py-0.5 text-xs"
          >content/data/affiliates/</code
        >.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'Partners and affiliates',
  description:
    'DevLounge partners and affiliate relationships, with disclosure and contact information.',
  path: '/partners',
})

const { data: affiliates } = await useAffiliates()
</script>
