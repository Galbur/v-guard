// Content and route guard (CLAUDE.md hard rules 1, 4, 7). Run with `npm run check`.
// 1. No placeholders or forbidden dashes anywhere in src/.
// 2. Every NL page has a UA pair: each route key has both page files, and every
//    page file is registered in src/i18n/routes.ts.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { locales, routes } from '../src/i18n/routes.ts';

const root = join(import.meta.dirname, '..');
const srcDir = join(root, 'src');
const pagesDir = join(srcDir, 'pages');
const problems: string[] = [];

const patterns: [RegExp, string][] = [
  [/TODO/, 'TODO'],
  [/TBD/, 'TBD'],
  [/\[\[/, '[['],
  [/lorem/i, 'lorem'],
  [/—/, 'em dash U+2014'],
  [/–/, 'en dash U+2013'],
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const textFile = /\.(astro|ts|js|mjs|css|md|mdx|json|html|svg|txt)$/;
for (const file of walk(srcDir).filter((f) => textFile.test(f))) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const [re, label] of patterns) {
        if (re.test(line)) problems.push(`${relative(root, file)}:${i + 1}: ${label}`);
      }
    });
}

// Page file for a route path, e.g. '/uk/ppf/' -> src/pages/uk/ppf.astro or .../ppf/index.astro
function pageFile(path: string): string | undefined {
  const base = path.replace(/^\/|\/$/g, '');
  const candidates = base ? [`${base}.astro`, `${base}/index.astro`] : ['index.astro'];
  return candidates.map((c) => join(pagesDir, c)).find(existsSync);
}

const registered = new Set<string>();
for (const [key, paths] of Object.entries(routes)) {
  for (const locale of locales) {
    const path = paths[locale];
    const file = pageFile(path);
    if (!file) problems.push(`routes.ts: ${key}.${locale} (${path}) has no page file`);
    else registered.add(file);
    const prefixed = path.startsWith('/uk/');
    if ((locale === 'uk') !== prefixed) problems.push(`routes.ts: ${key}.${locale} (${path}) has the wrong locale prefix`);
  }
}

const isSpecial = (file: string) => /(^|[/\\])404\.astro$/.test(file);
for (const file of walk(pagesDir).filter((f) => f.endsWith('.astro'))) {
  if (isSpecial(file)) continue;
  if (!registered.has(file)) problems.push(`${relative(root, file)}: page not registered in src/i18n/routes.ts`);
}
for (const file of walk(pagesDir).filter((f) => isSpecial(f) && !f.includes(`${sep}uk${sep}`))) {
  const pair = join(pagesDir, 'uk', relative(pagesDir, file));
  if (!existsSync(pair)) problems.push(`${relative(root, file)}: missing UA pair ${relative(root, pair)}`);
}

if (problems.length) {
  console.error(`check: ${problems.length} problem(s)\n${problems.map((p) => `  ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`check: ok (${Object.keys(routes).length} route pairs, no placeholders or forbidden dashes in src/)`);
