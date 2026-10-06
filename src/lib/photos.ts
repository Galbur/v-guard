// Real V Guard photos (src/assets/photos), processed by astro:assets at build time.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,png}', { eager: true });

export function photo(file: string): ImageMetadata {
  const entry = files[`../assets/photos/${file}`];
  if (!entry) throw new Error(`Photo not found in src/assets/photos: ${file}`);
  return entry.default;
}

export interface HeroPhotos {
  mobile: { file: string; position: string };
  desktop: { file: string; position: string };
}
