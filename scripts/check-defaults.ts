// Lists every value that still renders as a default (status 'default', from the design
// prompt «value | hint» markers) or as an ОЗВУЧЕНО fact ('spoken'), with its hint.
// Owner rule R2: before launch this list must be empty or explicitly approved.
// Usage: npm run check:defaults        report, exit 0
//        npm run check:defaults -- --strict   exit 1 when anything is listed (launch gate)
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as siteModule from '../src/config/site.ts';
import * as servicesModule from '../src/data/services.ts';

interface Row {
  file: string;
  field: string;
  status: string;
  value: string;
  hint: string;
}

const rows: Row[] = [];
const seen = new WeakSet<object>();

function show(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(show).join(', ');
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if ('nl' in v && 'uk' in v) return show(v.nl);
    if ('display' in v) return show(v.display);
    if ('label' in v) return show(v.label);
    if ('quote' in v) return `«${show(v.quote)}» ${show(v.author)}`;
    if ('title' in v) return show(v.title);
    return Object.entries(v)
      .map(([k, x]) => `${k}: ${show(x)}`)
      .join('; ');
  }
  return String(value);
}

function priceText(p: Record<string, unknown>): string {
  const amount = `€${Number(p.amount).toLocaleString('nl-NL')}`;
  return p.plus ? `+${amount}` : p.from ? `vanaf ${amount}` : amount;
}

function walk(node: unknown, path: string, file: string) {
  if (!node || typeof node !== 'object') return;
  if (seen.has(node)) return;
  seen.add(node);
  const obj = node as Record<string, unknown>;
  const status = obj.status;
  if (status === 'default' || status === 'spoken') {
    if ('amount' in obj) {
      rows.push({ file, field: path, status, value: priceText(obj), hint: String(obj.hint ?? '') });
      return;
    }
    if ('value' in obj) {
      rows.push({ file, field: path, status, value: show(obj.value), hint: String(obj.hint ?? '') });
      return;
    }
  }
  if (typeof obj === 'function') return;
  for (const [key, child] of Object.entries(obj)) {
    const label = Array.isArray(obj) ? `${path}[${key}]` : path ? `${path}.${key}` : key;
    // Name array items by id when they have one: services.ppfPackages[full-front].price
    const named =
      Array.isArray(obj) && child && typeof child === 'object' && 'id' in (child as object)
        ? `${path}[${(child as { id: string }).id}]`
        : label;
    walk(child, named, file);
  }
}

for (const [name, value] of Object.entries(siteModule)) walk(value, name, 'src/config/site.ts');
for (const [name, value] of Object.entries(servicesModule)) {
  // derived aliases (tintFrom, wrapFrom, serviceFrom, ...) point at prices already listed
  if (['tintFrom', 'wrapFrom', 'wrapFull', 'ppfFrom', 'serviceFrom', 'wrapFormParts'].includes(name)) continue;
  walk(value, name, 'src/data/services.ts');
}

const projectsDir = join(import.meta.dirname, '..', 'src', 'content', 'projects');
for (const file of readdirSync(projectsDir).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(join(projectsDir, file), 'utf8');
  const get = (key: string) => text.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
  const status = get('status');
  if (status !== 'default' && status !== 'spoken') continue;
  const car = get('car').match(/nl:\s*"([^"]*)"/)?.[1] ?? '';
  const detail = get('detail').match(/nl:\s*"([^"]*)"/)?.[1] ?? '';
  rows.push({
    file: `src/content/projects/${file}`,
    field: 'caption',
    status,
    value: [car, detail, get('film')].filter(Boolean).join(' · '),
    hint: get('hint').replace(/^"|"$/g, ''),
  });
}

const cols: (keyof Row)[] = ['file', 'field', 'status', 'value', 'hint'];
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const limits: Record<keyof Row, number> = { file: 34, field: 44, status: 7, value: 60, hint: 60 };
const widths = cols.map((c) => Math.max(c.length, ...rows.map((r) => cut(r[c], limits[c]).length)));
const line = (cells: string[]) => `| ${cells.map((cell, i) => cell.padEnd(widths[i])).join(' | ')} |`;
console.log(line(cols));
console.log(`|${widths.map((w) => '-'.repeat(w + 2)).join('|')}|`);
for (const r of rows) console.log(line(cols.map((c) => cut(r[c], limits[c]))));
const counts = rows.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
console.log(`\ncheck:defaults: ${rows.length} value(s) not confirmed (${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ')})`);
if (process.argv.includes('--strict') && rows.length > 0) process.exit(1);
