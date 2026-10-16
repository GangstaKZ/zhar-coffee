import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const menu = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/menu' }),
  schema: z.object({
    name: z.string(),
    description: z.string().max(160),
    price: z.number().int().positive(),
    category: z.enum(['espresso', 'filter', 'alt', 'food']),
    tags: z
      .array(
        z.enum(['single-origin', 'blend', 'oat', 'decaf', 'signature', 'vegan', 'hot', 'cold']),
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { menu };
