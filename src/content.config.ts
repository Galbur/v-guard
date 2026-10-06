// Project gallery entries: one file per project with a real V Guard photo in
// src/content/projects/ (block specs section 6). No video fields by design (D2).
// Slots without a photo are not created (owner decision R4).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ nl: z.string(), uk: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      car: localized,
      service: z.enum(['ppf', 'ramen-blinderen', 'car-wrapping']),
      /** What was done, e.g. «chameleon voorruit», «achterzijde · 20%». Empty when only the service applies. */
      detail: localized,
      film: z.string().optional(),
      image: image(),
      /** CSS object-position for 4:3 crops. */
      position: z.string().default('center'),
      /** Shown in «Recent werk» on the home page. */
      home: z.boolean().default(false),
      order: z.number(),
      date: z.coerce.date().optional(),
      // Caption status for check:defaults (R1). Never confirmed by default.
      status: z.enum(['confirmed', 'default']).default('default'),
      hint: z.string().optional(),
    }),
});

export const collections = { projects };
