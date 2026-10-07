// Canvas car for the wrap configurator: port of «VG Wrap Car.dc.html» (Claude Design) to
// vanilla TS. A white body photo (800×275, lossless) is segmented by pixel brightness and
// fixed wheel and mirror coordinates into zones (body, roof, mirror, window trim), then
// each chosen zone is recoloured with a finish model. Lossy images break the segmentation.

export interface CarPaint {
  hex: string;
  finish: string;
  full: boolean;
  dak: boolean;
  spiegel: boolean;
  chroom: boolean;
  pakket: boolean;
}

interface Segmented {
  data: Uint8ClampedArray;
  mask: Uint8Array;
  w: Float32Array;
  Ls: Float32Array;
  ref: number;
  ref3: number;
  gamma: number;
}

const W = 800;
const H = 275;

// Wheel centres and radii: front cx, cy, r, then rear cx, cy, r. Mid-tyre, so no white
// crescent stays on the arch.
const WHEELS: Record<string, number[]> = {
  hatch: [149, 206, 57, 645, 205, 59],
  sedan: [149, 206, 56, 643, 205, 58],
  station: [150, 205, 58, 636, 205, 58],
  suv: [147, 213, 49, 637, 213, 49],
  bus: [160, 243, 25, 585, 243, 25],
  coach: [170, 236, 31, 561, 236, 31],
};
// Mirror box [x0, x1, y0, y1].
const MIRRORS: Record<string, [number, number, number, number]> = {
  hatch: [280, 317, 82, 104],
  sedan: [283, 315, 84, 104],
  station: [282, 316, 84, 104],
  suv: [280, 320, 77, 102],
  bus: [204, 222, 111, 143],
  coach: [27, 43, 95, 133],
};
const GAMMA: Record<string, number> = { bus: 0.72, coach: 0.85 };

const cache = new Map<string, Promise<Segmented>>();

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`wrap-car: cannot load ${url}`));
    img.src = url;
  });
}

function segment(body: string, img: HTMLImageElement): Segmented {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  x.drawImage(img, 0, 0, W, H);
  const d = x.getImageData(0, 0, W, H).data;
  const N = W * H;
  const L = new Float32Array(N);
  const cand = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = d[i * 4];
    const g = d[i * 4 + 1];
    const b = d[i * 4 + 2];
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    L[i] = l;
    const s = Math.max(r, g, b) - Math.min(r, g, b);
    cand[i] = l > 108 && s < 36 ? 1 : 0;
  }
  // Car bounding box and the top of the paint in every column.
  const top = new Int16Array(W).fill(-1);
  let left = W;
  let right = 0;
  let carTop = H;
  for (let xx = 0; xx < W; xx++) {
    let cnt = 0;
    for (let y = 0; y < H * 0.8; y++) {
      if (cand[y * W + xx]) {
        cnt++;
        if (top[xx] < 0) top[xx] = y;
      }
    }
    if (cnt > 4) {
      left = Math.min(left, xx);
      right = Math.max(right, xx);
      if (top[xx] >= 0) carTop = Math.min(carTop, top[xx]);
    }
  }
  const ground = H - 1;
  const h = Math.round(H * 0.975) - carTop;
  const wh = WHEELS[body] ?? [150, 206, 58, 640, 205, 58];
  const wheels = [0, 3].map((k) => ({ cx: wh[k], cy: wh[k + 1], r: wh[k + 2] }));
  const MB = MIRRORS[body] ?? [282, 316, 82, 104];
  const darkMirror = body === 'bus' || body === 'coach';
  const belt = carTop + h * 0.55;

  // Glass: dark runs above the belt line with paint below them.
  const glass = new Uint8Array(N);
  for (let xx = left; xx <= right; xx++) {
    let y = carTop;
    while (y < belt) {
      if (L[y * W + xx] < 88 && top[xx] >= 0 && top[xx] < y) {
        let y2 = y;
        while (y2 < belt && L[y2 * W + xx] < 88) y2++;
        if (y2 - y >= 7) {
          let below = false;
          for (let yy = y2; yy < Math.min(H, y2 + h * 0.6); yy++) {
            if (cand[yy * W + xx]) {
              below = true;
              break;
            }
          }
          if (below) for (let k = y; k < y2; k++) glass[k * W + xx] = 1;
        }
        y = y2;
      } else y++;
    }
  }

  // Zones: 1 body, 2 roof, 3 mirror, 4 window trim (chrome).
  const mask = new Uint8Array(N);
  const lum: number[] = [];
  const lum3: number[] = [];
  const roofT = Math.max(8, h * 0.09);
  const glassTop = new Int16Array(W).fill(H);
  for (let xx = 0; xx < W; xx++) {
    for (let y = 0; y < H; y++) {
      if (glass[y * W + xx]) {
        glassTop[xx] = y;
        break;
      }
    }
  }
  for (let y = 0; y < H; y++) {
    for (let xx = 0; xx < W; xx++) {
      const i = y * W + xx;
      const inMirror = xx >= MB[0] && xx <= MB[1] && y >= MB[2] && y <= MB[3];
      if (darkMirror && inMirror && L[i] > 34) {
        mask[i] = 3;
        lum3.push(L[i]);
        continue;
      }
      if (!cand[i] || xx < left || xx > right || y < carTop || y > ground + 2) continue;
      let inWheel = false;
      for (const wheel of wheels) {
        const dx = xx - wheel.cx;
        const dy = y - wheel.cy;
        if (dx * dx + dy * dy < wheel.r * wheel.r) inWheel = true;
      }
      if (inWheel) continue;
      let m = 1;
      if (inMirror) m = 3;
      else if (top[xx] >= 0 && top[xx] <= carTop + h * 0.16) {
        const dz = (top[xx] - carTop) / (h * 0.16);
        const th = 3 + (roofT - 3) * Math.pow(1 - dz, 1.6);
        if (y <= Math.min(top[xx] + th, glassTop[xx] - 1)) m = 2;
      } else if (y < belt + 6) {
        let near = false;
        for (let dy = -4; dy <= 4 && !near; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            const yy = y + dy;
            const x2 = xx + dx;
            if (yy >= 0 && yy < H && x2 >= 0 && x2 < W && glass[yy * W + x2]) {
              near = true;
              break;
            }
          }
        }
        if (near) m = 4;
      }
      mask[i] = m;
      if (m === 1) lum.push(L[i]);
      if (m === 3) lum3.push(L[i]);
    }
  }
  lum.sort((a, b) => a - b);
  const ref = lum.length ? lum[Math.floor(lum.length * 0.7)] : 215;
  lum3.sort((a, b) => a - b);
  const ref3 = lum3.length ? lum3[Math.floor(lum3.length * 0.85)] : ref;

  // Soft edges: dilate zones by 1 px, blur a coverage weight, smooth luminance.
  const zone = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let xx = 0; xx < W; xx++) {
      const i = y * W + xx;
      let m = mask[i];
      if (!m) {
        for (let dy = -1; dy <= 1 && !m; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const yy = y + dy;
            const x2 = xx + dx;
            if (yy >= 0 && yy < H && x2 >= 0 && x2 < W && mask[yy * W + x2]) {
              m = mask[yy * W + x2];
              break;
            }
          }
        }
      }
      zone[i] = m;
    }
  }
  const blur = (src: Float32Array) => {
    const t = new Float32Array(N);
    for (let y = 0; y < H; y++) {
      for (let xx = 0; xx < W; xx++) {
        let s = 0;
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= H) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const x2 = xx + dx;
            if (x2 < 0 || x2 >= W) continue;
            s += src[yy * W + x2];
            n++;
          }
        }
        t[y * W + xx] = s / n;
      }
    }
    return t;
  };
  let w = new Float32Array(N);
  for (let i = 0; i < N; i++) w[i] = mask[i] ? 1 : 0;
  w = blur(blur(w));
  return { data: d, mask: zone, w, Ls: blur(L), ref, ref3, gamma: GAMMA[body] ?? 1 };
}

/** Load and segment a body once; later calls reuse the result. */
export function loadBody(body: string, url: string): Promise<Segmented> {
  let entry = cache.get(body);
  if (!entry) {
    entry = loadImage(url).then((img) => segment(body, img));
    entry.catch(() => cache.delete(body));
    cache.set(body, entry);
  }
  return entry;
}

const ENV: Record<string, number> = { glans: 0.1, satijn: 0.08, mat: 0.05, metallic: 0.1, carbon: 0.07 };
const SPEC: Record<string, number> = { glans: 1, satijn: 0.45, mat: 0.08, metallic: 0.8, carbon: 0.4 };

type Rgb = number[];
type ZonePaint = { colour: Rgb; finish: string } | null;

const rgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

export function paint(canvas: HTMLCanvasElement, seg: Segmented, p: CarPaint): void {
  const all: ZonePaint = { colour: rgb(p.hex), finish: p.finish };
  const zone: ZonePaint = p.pakket ? { colour: rgb('#0A0A0B'), finish: 'glans' } : all;
  const trim: ZonePaint = { colour: rgb('#0E0F11'), finish: 'glans' };
  // Per zone (index = zone id): what to paint, or null = keep the original pixels.
  const T: ZonePaint[] = [
    null,
    p.full ? all : null,
    p.full ? all : p.dak ? zone : null,
    p.full ? all : p.spiegel ? zone : null,
    p.full || p.chroom ? trim : null,
  ];
  const { data, mask, w, Ls, ref, ref3, gamma } = seg;
  const out = new Uint8ClampedArray(data);
  for (let i = 0; i < W * H; i++) {
    const m = mask[i];
    if (!m) continue;
    const t = T[m];
    if (!t) continue;
    const wi = w[i];
    if (wi < 0.02) continue;
    const C = t.colour;
    const f = t.finish;
    const l = Math.pow(Ls[i] / (m === 3 ? ref3 : ref), m === 3 ? 1 : gamma);
    let s = l;
    const x = i % W;
    const y = (i / W) | 0;
    if (f === 'glans') s = Math.pow(l, 1.15);
    else if (f === 'mat') s = 0.45 + 0.55 * Math.min(l, 1.02);
    else if (f === 'satijn') s = Math.min(l, 1.12);
    else if (f === 'metallic')
      s = Math.pow(Math.min(l, 1.15), 1.1) + ((((x * 73 + y * 151) ^ (x * y)) & 7) / 7 - 0.5) * 0.09;
    else if (f === 'carbon') {
      const bx = (x / 6) | 0;
      const by = (y / 6) | 0;
      const hz = ((bx + by) & 1) === 0;
      const tt = hz ? (x % 6) / 5 : (y % 6) / 5;
      s = Math.min(l, 1.08) * (0.62 + 0.38 * (0.35 + 0.65 * Math.abs(tt - 0.5) * 2));
    }
    const spec = Math.max(0, Math.min(1, (l - 1.03) / 0.12)) * SPEC[f];
    const env = ENV[f];
    for (let k = 0; k < 3; k++) {
      let v = C[k] * s + env * s * s * (1 - C[k]) + spec * 0.9;
      v = Math.max(0, Math.min(255, v * 255));
      out[i * 4 + k] = data[i * 4 + k] + (v - data[i * 4 + k]) * wi;
    }
  }
  canvas.getContext('2d')!.putImageData(new ImageData(out, W, H), 0, 0);
}
