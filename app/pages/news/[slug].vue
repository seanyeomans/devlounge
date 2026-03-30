<template>
  <div v-if="doc" class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
    <article>
      <header class="space-y-3 border-b border-white/10 pb-8">
        <p class="text-sm text-sky-300">
          <NuxtLink to="/news" class="hover:text-sky-200">News</NuxtLink>
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {{ doc.title }}
        </h1>
        <p v-if="doc.description" class="text-lg text-slate-300">
          {{ doc.description }}
        </p>
        <p v-if="doc.source" class="text-sm text-slate-500">
          Source: {{ doc.source }}
        </p>
        <a
          v-if="doc.link"
          :href="doc.link"
          class="inline-flex text-sm font-medium text-sky-300 hover:text-sky-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read original ↗
        </a>
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
const path = `/news/${slug}`

const { data: doc } = await useAsyncData(`news-${slug}`, () =>
  queryCollection('news').path(path).first(),
)

const page = doc.value
if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'News item not found' })
}

useSiteSeo({
  title: page.title,
  description: page.description ?? undefined,
  path,
})
</script>
