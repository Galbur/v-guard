// Project gallery entries: one file per project in src/content/projects/
// (block specs section 6). No video fields by design (D2).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      car: z.string(),
      service: z.enum(['ppf', 'ramen-blinderen', 'car-wrapping']),
      film: z.string().optional(),
      image: image(),
      caption: z.object({ nl: z.string(), uk: z.string() }),
      date: z.coerce.date(),
    }),
});

export const collections = { projects };
