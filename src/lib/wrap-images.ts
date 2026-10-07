// Images of the wrap page, processed by astro:assets at build time.
// AI illustrations (D18) live in src/assets/illustrations; the canvas car bodies are lossless
// WebP in src/assets/wrap-cars and are served unprocessed (?url): the configurator segments
// them by pixel, so they must not be re-encoded with losses.
import type { ImageMetadata } from 'astro';

const illustrations = import.meta.glob<{ default: ImageMetadata }>('../assets/illustrations/wrap-*.png', {
  eager: true,
});
const carStills = import.meta.glob<{ default: ImageMetadata }>('../assets/wrap-cars/*.webp', { eager: true });
const carUrls = import.meta.glob<string>('../assets/wrap-cars/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function illustration(file: string): ImageMetadata {
  const entry = illustrations[`../assets/illustrations/${file}`];
  if (!entry) throw new Error(`Illustration not found in src/assets/illustrations: ${file}`);
  return entry.default;
}

/** Car body photo as image metadata (thumbnails, no-JS still). */
export function carStill(body: string): ImageMetadata {
  const entry = carStills[`../assets/wrap-cars/${body}.webp`];
  if (!entry) throw new Error(`Car body not found in src/assets/wrap-cars: ${body}`);
  return entry.default;
}

/** Unprocessed lossless file for the canvas. */
export function carUrl(body: string): string {
  const url = carUrls[`../assets/wrap-cars/${body}.webp`];
  if (!url) throw new Error(`Car body not found in src/assets/wrap-cars: ${body}`);
  return url;
}
