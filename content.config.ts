import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const published = z.boolean().optional().default(true)

export default defineContentConfig({
  collections: {
    episodes: defineCollection({
      type: 'page',
      source: {
        include: 'podcast/**/*.md',
        prefix: '/podcast',
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date(),
        youtubeId: z.string().optional(),
        featured: z.boolean().optional().default(false),
        duration: z.string().optional(),
        season: z.number().optional(),
        episode: z.number().optional(),
        published,
      }),
      indexes: [
        { columns: ['date'] },
        { columns: ['published', 'date'] },
        { columns: ['featured'] },
      ],
    }),

    resources: defineCollection({
      type: 'page',
      source: {
        include: 'resources/**/*.md',
        prefix: '/resources',
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date(),
        category: z.string(),
        tags: z.array(z.string()).optional(),
        published,
      }),
      indexes: [
        { columns: ['date'] },
        { columns: ['category'] },
        { columns: ['published', 'date'] },
      ],
    }),

    news: defineCollection({
      type: 'page',
      source: {
        include: 'news/**/*.md',
        prefix: '/news',
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date(),
        source: z.string().optional(),
        link: z.string().url().optional(),
        published,
      }),
      indexes: [{ columns: ['date'] }, { columns: ['published', 'date'] }],
    }),

    affiliates: defineCollection({
      type: 'data',
      source: 'data/affiliates/*.json',
      schema: z.object({
        name: z.string(),
        url: z.string().url(),
        description: z.string().optional(),
        logo: z.string().optional(),
        tier: z.enum(['partner', 'affiliate']).optional().default('affiliate'),
        order: z.number().optional().default(0),
      }),
      indexes: [{ columns: ['order'] }, { columns: ['tier'] }],
    }),
  },
})
