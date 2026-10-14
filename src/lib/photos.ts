// Real V Guard photos (src/assets/photos) and generated illustrations (src/assets/illustrations),
// processed by astro:assets at build time. Illustrations are AI-generated (owner decision
// 06.10.2026): decorative only, alt="", never shown as V Guard work or the V Guard studio.
import type { ImageMetadata } from 'astro';

// Explicit list, no wildcards: every file a glob matches (lazy globs too) is emitted to dist/_astro
// and reachable by its hashed URL, even when no page shows it. Add a file here when a page starts
// using it; `npm run check` fails on an entry that nothing in src/ uses.
const files = import.meta.glob<{ default: ImageMetadata }>(
  [
    '../assets/photos/bmw-34-p.png',
    '../assets/photos/bmw-front-p.png',
    '../assets/photos/bmw-windshield-l.jpg',
    '../assets/photos/ford-after.jpg',
    '../assets/photos/ford-before.jpg',
    '../assets/photos/hex-van-l2.jpg',
    '../assets/photos/passat-rear-1.jpg',
    '../assets/photos/real-audi-a7-zij.png',
    '../assets/photos/real-bmw-3-front.png',
    '../assets/photos/real-bmw-3-voorruit.png',
    '../assets/photos/real-volvo-v60.png',
    '../assets/photos/suv-blue-1.jpg',
    '../assets/illustrations/ppf-hero-1280.jpg',
    '../assets/illustrations/ppf-step-check.webp',
    '../assets/illustrations/ppf-step-clay.webp',
    '../assets/illustrations/ppf-step-degrease.webp',
    '../assets/illustrations/ppf-step-install.jpg',
    '../assets/illustrations/ppf-step-wash.webp',
  ],
  { eager: true },
);

export function photo(file: string): ImageMetadata {
  const entry = files[`../assets/photos/${file}`] ?? files[`../assets/illustrations/${file}`];
  if (!entry) throw new Error(`Photo not listed in src/lib/photos.ts (or missing on disk): ${file}`);
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
