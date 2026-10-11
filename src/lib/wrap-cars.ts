// Car bodies of the wrap configurator: lossless WebP in src/assets/wrap-cars, served
// unprocessed (?url), because the canvas segments them by pixel and lossy re-encoding breaks
// that. Imported only by WrapConfigurator, so nothing ships while the feature is off (D19).
import type { ImageMetadata } from 'astro';

const carStills = import.meta.glob<{ default: ImageMetadata }>('../assets/wrap-cars/*.webp', { eager: true });
const carUrls = import.meta.glob<string>('../assets/wrap-cars/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Car body photo as image metadata (thumbnails). */
export function carStill(body: string): ImageMetadata {
  const entry = carStills[`../assets/wrap-cars/${body}.webp`];
  if (!entry) throw new Error(`Car body not found in src/assets/wrap-cars: ${body}`);
  return entry.default;
}

/** Unprocessed lossless file for the canvas and the no-JS still. */
export function carUrl(body: string): string {
  const url = carUrls[`../assets/wrap-cars/${body}.webp`];
  if (!url) throw new Error(`Car body not found in src/assets/wrap-cars: ${body}`);
  return url;
}
