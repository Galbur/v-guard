// AI illustrations of the wrap page (D18, src/assets/illustrations), processed by astro:assets.
// The configurator's car bodies live in wrap-cars.ts, so they ship only with the configurator.
import type { ImageMetadata } from 'astro';

const illustrations = import.meta.glob<{ default: ImageMetadata }>('../assets/illustrations/wrap-*.png', {
  eager: true,
});

export function illustration(file: string): ImageMetadata {
  const entry = illustrations[`../assets/illustrations/${file}`];
  if (!entry) throw new Error(`Illustration not found in src/assets/illustrations: ${file}`);
  return entry.default;
}
