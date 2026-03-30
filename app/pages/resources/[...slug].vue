<template>
  <div v-if="doc" class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
    <article>
      <header class="space-y-3 border-b border-white/10 pb-8">
        <p class="text-sm text-emerald-300">
          <NuxtLink to="/resources" class="hover:text-emerald-200"
            >Resources</NuxtLink
          >
          <span class="text-slate-600" aria-hidden="true"> / </span>
          <span class="text-slate-400">{{ doc.category }}</span>
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {{ doc.title }}
        </h1>
        <p v-if="doc.description" class="text-lg text-slate-300">
          {{ doc.description }}
        </p>
      </header>

      <div class="content-prose max-w-none">
        <ContentRenderer v-if="doc" :value="doc" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const segments = route.params.slug
const parts = Array.isArray(segments)
  ? segments
  : segments
    ? [segments]
    : []
const path = `/resources/${parts.join('/')}`

const { data: doc } = await useAsyncData(`resource-${path}`, () =>
  queryCollection('resources').path(path).first(),
)

const page = doc.value
if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'Resource not found' })
}

useSiteSeo({
  title: page.title,
  description: page.description ?? undefined,
  path,
})
</script>
