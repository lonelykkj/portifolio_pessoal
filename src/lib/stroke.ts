import { FALLBACK_ADVANCE, GLYPHS, LIGATURES } from '@/lib/glyphs'
import type { Project } from '@/types/portfolio'

export const round1 = (n: number) => Math.round(n * 10) / 10

export const pad2 = (n: number) => (n < 10 ? '0' : '') + n

export function hashString(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Gerador pseudo-aleatório determinístico (mulberry32). */
export function seededRandom(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 1831565813) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function layoutText(text: string, gap: number, ligatures: boolean) {
  const chars = [...text.toUpperCase()]
  const items: { ch: string; x: number; d: string }[] = []
  let x = 0
  for (let i = 0; i < chars.length; i++) {
    const pair = chars[i] + (chars[i + 1] ?? '')
    const ligature = LIGATURES[pair]
    if (ligatures && ligature) {
      items.push({ ch: pair, x, d: ligature.d })
      x += ligature.w + gap
      i++
      continue
    }
    const glyph = GLYPHS[chars[i]]
    if (!glyph) {
      x += FALLBACK_ADVANCE
      continue
    }
    items.push({ ch: chars[i], x, d: glyph.d })
    x += glyph.w + gap
  }
  const width = Math.max(0, items.length ? x - gap : 0)
  return { items, width }
}

export function splitSubpaths(d: string) {
  return d
    .split(/(?=M)/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Gera uma assinatura cursiva a partir das letras do texto. */
export function signaturePath(text: string) {
  const letters = [...text.replace(/[^A-Za-z]/g, '')].slice(0, 12)
  const rand = seededRandom(hashString(text || 'signature'))
  const base = 64
  let x = 4
  let d = `M0 ${base + 6} C1 ${base + 2} 2 ${base} ${x} ${base}`

  const loop = (w: number, h: number) =>
    ` C${round1(x + w * 0.95)} ${round1(base - h * 0.5)} ${round1(x + w * 0.9)} ${round1(base - h)} ${round1(x + w * 0.55)} ${round1(base - h)}` +
    ` C${round1(x + w * 0.15)} ${round1(base - h)} ${round1(x + w * 0.3)} ${base} ${round1(x + w)} ${base}`

  if (!letters.length) letters.push('s')

  letters.forEach((letter, index) => {
    const lower = letter.toLowerCase()
    const isCapital = letter !== lower || index === 0
    let w = 16 + rand() * 10
    if (isCapital) {
      w += 12
      d += loop(w, 52 + rand() * 8)
    } else if (/[bdfhklt]/.test(lower)) {
      d += loop(w, 42 + rand() * 6)
    } else if (/[gjpqyz]/.test(lower)) {
      d += loop(w, -(30 + rand() * 6))
    } else if (rand() < 0.55) {
      const h = 15 + rand() * 6
      d += ` C${round1(x + w * 0.1)} ${round1(base - h)} ${round1(x + w * 0.8)} ${round1(base - h)} ${round1(x + w)} ${base}`
    } else {
      d += loop(w, 16 + rand() * 5)
    }
    x += w
  })

  d +=
    ` C${round1(x + 18)} ${base - 6} ${round1(x + 20)} ${base + 16} ${round1(x - 6)} ${base + 18}` +
    ` C${round1(x * 0.55)} ${base + 22} ${round1(x * 0.25)} ${base + 12} 4 ${base + 20}`

  return { d, width: round1(x + 24) }
}

/** Gera as pétalas de uma folha ao longo de uma curva. */
export function bloomPath(seed: number, size = 400) {
  const rand = seededRandom(seed)
  const scale = size / 400
  const point = (t: number) => ({
    x: (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 110 + t * t * 370,
    y: (1 - t) * (1 - t) * 390 + 2 * (1 - t) * t * 110 + t * t * 60,
  })
  let d = ''
  for (let t = 0.08; t < 0.97; t += 0.05) {
    const p = point(t)
    const q = point(t + 0.01)
    const len = Math.hypot(q.x - p.x, q.y - p.y) || 1
    const tx = (q.x - p.x) / len
    const ty = (q.y - p.y) / len
    const reach =
      (40 + 120 * Math.pow(Math.sin(Math.PI * t), 0.8)) * (0.9 + rand() * 0.2)
    for (const side of [1, -1]) {
      const nx = -ty * side
      const ny = tx * side
      const ex = p.x + (nx * 0.72 + tx * 0.7) * reach
      const ey = p.y + (ny * 0.72 + ty * 0.7) * reach
      const bulge = 7 + 5 * Math.sin(Math.PI * t)
      const mx = (p.x + ex) / 2
      const my = (p.y + ey) / 2
      d +=
        `M${round1(p.x * scale)} ${round1(p.y * scale)} ` +
        `Q${round1((mx + nx * bulge - tx * bulge) * scale)} ${round1((my + ny * bulge - ty * bulge) * scale)} ${round1(ex * scale)} ${round1(ey * scale)} ` +
        `Q${round1((mx - nx * bulge * 0.4 + tx * bulge) * scale)} ${round1((my - ny * bulge * 0.4 + ty * bulge) * scale)} ${round1(p.x * scale)} ${round1(p.y * scale)}Z`
    }
  }
  return d
}

export function projectMark(project: Project) {
  return (project.mark || project.title.split(/\s+/)[0] || '')
    .toUpperCase()
    .slice(0, 6)
}
