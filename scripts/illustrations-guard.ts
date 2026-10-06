// D18 guard: AI illustrations (src/assets/illustrations/, docs/design/assets/generated/) may
// appear in Hero, ProcessSteps and other illustrative slots, never in the list of finished work:
// src/content/projects/, ProjectGallery, the Projecten page. Used by scripts/check.ts and tests.
// Catches a file name, its stem or the folder path in those sources, and a renamed copy
// (same bytes) placed in src/content/projects/ or src/assets/photos/.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';

export const illustrationDirs = ['src/assets/illustrations', 'docs/design/assets/generated'];

/** Sources that make up the list of finished work (Projecten NL and UA, gallery, projects). */
export const workSources = [
  'src/content/projects',
  'src/components/ProjectGallery.astro',
  'src/views/ProjectsView.astro',
  'src/pages/projecten.astro',
  'src/pages/uk/proiekty.astro',
];

/** Folders where a renamed copy of an illustration would pass as a real photo. */
const copyTargets = ['src/content/projects', 'src/assets/photos'];

const textFile = /\.(astro|ts|js|mjs|md|mdx|json|yaml|yml|html)$/;

function files(path: string): string[] {
  if (!existsSync(path)) return [];
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path).flatMap((name) => files(join(path, name)));
}

const hash = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

export function checkIllustrations(root: string): string[] {
  const problems: string[] = [];
  const illustrations = illustrationDirs.flatMap((dir) => files(join(root, dir)));
  const names = new Set(illustrations.flatMap((f) => [basename(f), basename(f, extname(f))]));
  const hashes = new Map(illustrations.map((f) => [hash(f), relative(root, f)]));
  const dirPattern = /assets\/illustrations\/|design\/assets\/generated\//;

  for (const file of workSources.flatMap((s) => files(join(root, s))).filter((f) => textFile.test(f))) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        const where = `${relative(root, file)}:${i + 1}`;
        if (dirPattern.test(line)) problems.push(`${where}: AI illustration path in the list of work (D18)`);
        for (const name of names) {
          if (line.includes(name)) problems.push(`${where}: AI illustration «${name}» in the list of work (D18)`);
        }
      });
  }

  for (const file of copyTargets.flatMap((d) => files(join(root, d))).filter((f) => !textFile.test(f))) {
    const source = hashes.get(hash(file));
    if (source) problems.push(`${relative(root, file)}: copy of AI illustration ${source} (D18)`);
  }

  return [...new Set(problems)];
}
