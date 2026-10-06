// D18 guard: AI illustrations must never reach the list of finished work.
// Builds a throwaway tree in the OS temp dir; nothing in the repo is touched.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkIllustrations } from '../scripts/illustrations-guard.ts';

function tree() {
  const root = mkdtempSync(join(tmpdir(), 'vg-d18-'));
  mkdirSync(join(root, 'src/assets/illustrations'), { recursive: true });
  mkdirSync(join(root, 'src/assets/photos'), { recursive: true });
  mkdirSync(join(root, 'src/content/projects'), { recursive: true });
  mkdirSync(join(root, 'src/components'), { recursive: true });
  writeFileSync(join(root, 'src/assets/illustrations/ppf-mirror.webp'), 'generated-bytes');
  writeFileSync(join(root, 'src/assets/photos/hex-van-l1.jpg'), 'real-bytes');
  writeFileSync(join(root, 'src/content/projects/bmw.md'), 'image: ../../assets/photos/hex-van-l1.jpg\n');
  writeFileSync(join(root, 'src/components/ProjectGallery.astro'), '<Photo src={p.image} alt="" />\n');
  return root;
}

test('passes when the list of work only uses real photos', () => {
  const root = tree();
  assert.deepEqual(checkIllustrations(root), []);
  rmSync(root, { recursive: true });
});

test('fails on an illustration referenced from a project', () => {
  const root = tree();
  writeFileSync(join(root, 'src/content/projects/fake.md'), 'image: ../../assets/illustrations/ppf-mirror.webp\n');
  const problems = checkIllustrations(root);
  assert.ok(problems.some((p) => p.startsWith('src/content/projects/fake.md:1') && p.includes('ppf-mirror')));
  rmSync(root, { recursive: true });
});

test('fails on an illustration used in ProjectGallery by stem', () => {
  const root = tree();
  writeFileSync(join(root, 'src/components/ProjectGallery.astro'), "const extra = photo('ppf-mirror.jpg');\n");
  assert.ok(checkIllustrations(root).some((p) => p.includes('ProjectGallery.astro:1')));
  rmSync(root, { recursive: true });
});

test('fails on a renamed copy passed off as a real photo', () => {
  const root = tree();
  cpSync(join(root, 'src/assets/illustrations/ppf-mirror.webp'), join(root, 'src/assets/photos/suv-mirror.webp'));
  assert.ok(checkIllustrations(root).some((p) => p.startsWith('src/assets/photos/suv-mirror.webp: copy of AI illustration')));
  rmSync(root, { recursive: true });
});
