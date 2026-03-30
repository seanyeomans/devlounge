<template>
  <div class="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
    <section class="max-w-3xl space-y-4">
      <p class="text-sm font-medium text-indigo-300">devlounge.ca</p>
      <h1
        class="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
      >
        The DevLounge podcast, live builds, and a practical dev wiki.
      </h1>
      <p class="text-lg leading-relaxed text-slate-300">
        Watch on YouTube, read shownotes here, and skim curated news and
        snippets between episodes.
      </p>
    </section>

    <HomeLiveNowSection :fallback-youtube-id="featured?.youtubeId ?? null" />

    <HomeFeaturedEpisodeSection :episode="featured ?? null" />

    <HomeLatestEpisodesSection v-if="episodes?.length" :episodes="episodes" />

    <HomeLatestResourcesSection
      v-if="resources?.length"
      :resources="resources"
    />

    <HomeLatestNewsSection v-if="newsItems?.length" :items="newsItems" />

    <section v-if="affiliates?.length" class="space-y-4" aria-labelledby="partners-heading">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="partners-heading"
          class="text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          Partners &amp; affiliates
        </h2>
        <NuxtLink
          to="/partners"
          class="text-sm font-medium text-amber-300 hover:text-amber-200"
        >
          Partnership details →
        </NuxtLink>
      </div>
      <PartnersAffiliateGrid :affiliates="affiliates" />
    </section>

    <NewsletterCta />
  </div>
</template>

<script setup lang="ts">
useSiteSeo({
  title: 'DevLounge — podcast, live streams, and developer resources',
  description:
    'Official home of the DevLounge podcast: episodes on YouTube, shownotes, live stream embeds, a wiki-style resource hub, dev news, and partners.',
  path: '/',
})

const { data: featured } = await useFeaturedEpisode()
const { data: episodes } = await useLatestEpisodes(6)
const { data: resources } = await useLatestResources(5)
const { data: newsItems } = await useLatestNews(6)
const { data: affiliates } = await useAffiliates()
</script>
