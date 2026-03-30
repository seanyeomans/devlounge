<template>
  <div v-if="doc" class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
    <article>
      <header class="space-y-3 border-b border-white/10 pb-8">
        <p class="text-sm text-indigo-300">
          <NuxtLink to="/podcast" class="hover:text-indigo-200">Podcast</NuxtLink>
          <span class="text-slate-600" aria-hidden="true"> / </span>
          <span class="text-slate-400">Episode</span>
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {{ doc.title }}
        </h1>
        <p v-if="doc.description" class="text-lg text-slate-300">
          {{ doc.description }}
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <a
            v-if="doc.youtubeId"
            :href="`https://www.youtube.com/watch?v=${doc.youtubeId}`"
            class="inline-flex rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        </div>
      </header>

      <div class="content-prose max-w-none">
        <ContentRenderer v-if="doc" :value="doc" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const path = `/podcast/${slug}`

const { data: doc } = await useAsyncData(`episode-${slug}`, () =>
  queryCollection('episodes').path(path).first(),
)

const page = doc.value
if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'Episode not found' })
}

useSiteSeo({
  title: page.title,
  description: page.description ?? undefined,
  path,
})
</script>
