// Project gallery entries: one file per project with a real V Guard photo in
// src/content/projects/ (block specs section 6). No video fields by design (D2).
// Slots without a photo are not created (owner decision R4).
// Two input shapes stay valid: the original one (car, service, image) and the one with
// several photos and services (make, model, services, images). The schema normalises both
// to car, services, images, so views and ProjectGallery read one shape.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ nl: z.string(), uk: z.string() });
const service = z.enum(['ppf', 'ramen-blinderen', 'car-wrapping']);
const status = z.enum(['confirmed', 'default']);

/** A caption value with its own status for check:defaults (R1), e.g. a model to be confirmed. */
const fact = <T extends z.ZodTypeAny>(value: T) =>
  z.object({ value, uk: z.string().optional(), status, hint: z.string().optional() });

// «okt 2026» as in the wrap «Recent werk» dates (D28); a plain YAML date also works.
const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
const date = z.preprocess((v) => {
  const m = typeof v === 'string' ? v.trim().match(/^([a-z]{3}) (\d{4})$/) : null;
  return m && months.includes(m[1]) ? new Date(Date.UTC(Number(m[2]), months.indexOf(m[1]), 1)) : v;
}, z.coerce.date());

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        /** Original shape: car name per locale. New shape: make + model. */
        car: localized.optional(),
        make: z.string().optional(),
        model: z.union([z.string(), fact(z.string())]).optional(),
        /** Original shape: one service. New shape: services, first one leads. */
        service: service.optional(),
        services: z.array(service).min(1).optional(),
        /** What was done, e.g. «chameleon voorruit», «achterzijde · 20%». Empty when only the service applies. */
        detail: localized.default({ nl: '', uk: '' }),
        film: z.union([z.string(), fact(z.string().nullable())]).optional(),
        /** PPF package (Full Front, Full Body, gedeeltelijk); not in the caption while default. */
        package: fact(z.string().nullable()).optional(),
        /** Original shape: one photo. New shape: images, first one is the card photo. */
        image: image().optional(),
        images: z.array(z.object({ src: image(), alt: localized.optional() })).min(1).optional(),
        /** CSS object-position for 4:3 crops. */
        position: z.string().default('center'),
        /** Done by a V Guard specialist outside the Vroomshoop building, photo from the client (D29). */
        offsite: z.boolean().default(false),
        /** Shown in «Recent werk» on the home page. */
        home: z.boolean().default(false),
        order: z.number(),
        date: date.optional(),
        // Caption status for check:defaults (R1). Never confirmed by default.
        status: status.default('default'),
        hint: z.string().optional(),
      })
      .refine((p) => p.car || (p.make && p.model), { message: 'car or make + model is required' })
      .refine((p) => p.service || p.services, { message: 'service or services is required' })
      .refine((p) => p.image || p.images, { message: 'image or images is required' })
      .transform(({ car, make, model, service, services, film, image, images, ...rest }) => {
        const modelNl = typeof model === 'string' ? model : model?.value;
        const modelUk = typeof model === 'string' ? model : (model?.uk ?? model?.value);
        return {
          ...rest,
          car: car ?? { nl: `${make} ${modelNl}`, uk: `${make} ${modelUk}` },
          services: services ?? [service!],
          // A film still marked default stays out of the caption.
          film: typeof film === 'string' ? film : film?.status === 'confirmed' ? (film.value ?? undefined) : undefined,
          images: images ?? [{ src: image!, alt: undefined }],
        };
      }),
});

export const collections = { projects };
