// Real V Guard photos (src/assets/photos) and generated illustrations (src/assets/illustrations),
// processed by astro:assets at build time. Illustrations are AI-generated (owner decision
// 06.10.2026): decorative only, alt="", never shown as V Guard work or the V Guard studio.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/{photos,illustrations}/*.{jpg,png,webp}', {
  eager: true,
});

export function photo(file: string): ImageMetadata {
  const entry = files[`../assets/photos/${file}`] ?? files[`../assets/illustrations/${file}`];
  if (!entry) throw new Error(`Photo not found in src/assets/photos or src/assets/illustrations: ${file}`);
  return entry.default;
}

export interface HeroPhoto {
  file: string;
  position: string;
  /** Empty (decorative) by default; AI illustrations always stay empty (D18). */
  alt?: string;
}

export interface HeroPhotos {
  mobile: HeroPhoto;
  desktop: HeroPhoto;
}
