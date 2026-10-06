// object-position without inline styles: the Netlify CSP (style-src 'self') ignores style="".
// A position like «22% 48%», «center 55%» or «center» becomes classes ox-22 oy-48 (or dox-/doy-
// for the desktop crop in Hero) that set --ox/--oy (--dox/--doy) in src/styles/object-position.css.
const keyword: Record<string, number> = { left: 0, top: 0, center: 50, right: 100, bottom: 100 };

function axis(token: string | undefined): number {
  if (!token) return 50;
  if (token in keyword) return keyword[token];
  const pct = token.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (!pct) throw new Error(`Unsupported object-position value: ${token} (use keywords or percentages)`);
  return Math.min(100, Math.max(0, Math.round(Number(pct[1]))));
}

/** «22% 48%» -> ['ox-22', 'oy-48']; prefix 'd' -> ['dox-22', 'doy-48']. */
export function positionClasses(position: string, prefix: '' | 'd' = ''): string[] {
  const [first, second] = position.trim().split(/\s+/);
  // CSS order is x y, but a single vertical keyword («top») means x = center.
  const vertical = first === 'top' || first === 'bottom';
  const x = vertical ? 50 : axis(first);
  const y = vertical ? axis(first) : axis(second);
  return [`${prefix}ox-${x}`, `${prefix}oy-${y}`];
}
