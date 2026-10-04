import { useId } from 'react'
import { pad2, round1, seededRandom } from '@/lib/stroke'
import { TONES } from '@/lib/tones'
import type { ArtKind, Palette } from '@/types/portfolio'

const FONT =
  'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif'

interface ProjectArtProps {
  kind: ArtKind
  seed: number
  mark: string
  colors: Palette
}

/** Capa gerada proceduralmente para projetos sem imagem. */
export function ProjectArt({ kind, seed, mark, colors }: ProjectArtProps) {
  const id = useId().replace(/:/g, '')
  const rand = seededRandom(seed)
  const pick = () => colors[TONES[Math.floor(rand() * TONES.length)]]
  const svg = {
    viewBox: '0 0 320 220',
    width: 320,
    height: 220,
    preserveAspectRatio: 'xMidYMid slice',
    'aria-hidden': true,
  } as const

  if (kind === 'render') {
    const accent = pick()
    const cx = 120 + rand() * 80
    return (
      <svg {...svg}>
        <defs>
          <linearGradient id={id + '-bg'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef2ff" />
            <stop offset="1" stopColor={accent} stopOpacity=".55" />
          </linearGradient>
          <radialGradient id={id + '-ball'} cx=".35" cy=".3" r=".75">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".35" stopColor={accent} />
            <stop offset="1" stopColor="#1b2234" stopOpacity=".85" />
          </radialGradient>
          <linearGradient id={id + '-pill'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset="1" stopColor={colors.blue} stopOpacity=".7" />
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill={`url(#${id}-bg)`} />
        <ellipse cx="160" cy="186" rx="150" ry="22" fill="#ffffff" opacity=".55" />
        <ellipse cx={round1(cx)} cy="182" rx="52" ry="9" fill="#1b2234" opacity=".18" />
        <circle cx={round1(cx)} cy="128" r="52" fill={`url(#${id}-ball)`} />
        <ellipse
          cx={round1(cx - 18)}
          cy="104"
          rx="16"
          ry="9"
          fill="#fff"
          opacity=".7"
          transform={`rotate(-30 ${round1(cx - 18)} 104)`}
        />
        <rect
          x={round1(cx + 30)}
          y="62"
          width="96"
          height="34"
          rx="17"
          fill={`url(#${id}-pill)`}
          transform={`rotate(-24 ${round1(cx + 78)} 79)`}
        />
        <g transform={`translate(${round1(40 + rand() * 30)} 132)`}>
          <path d="M0 14 L22 0 L44 14 L22 28Z" fill="#ffffff" />
          <path d="M0 14 L22 28 V54 L0 40Z" fill={colors.green} />
          <path d="M44 14 L22 28 V54 L44 40Z" fill={colors.green} opacity=".7" />
        </g>
        <text
          x="18"
          y="30"
          fontFamily={FONT}
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill="#1b2234"
          opacity=".7"
        >
          {mark} · 3D
        </text>
      </svg>
    )
  }

  if (kind === 'page') {
    const accent = pick()
    return (
      <svg {...svg}>
        <rect width="320" height="220" fill="#eef1f6" />
        <circle cx="262" cy="40" r="70" fill={accent} opacity=".22" />
        <g transform="translate(36 18)">
          <rect width="112" height="210" rx="16" fill="#ffffff" />
          <rect x="8" y="8" width="96" height="70" rx="10" fill={accent} opacity=".9" />
          <circle cx="56" cy="46" r="20" fill="#ffffff" opacity=".9" />
          <text
            x="56"
            y="51"
            textAnchor="middle"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="800"
            fill={accent}
          >
            {mark.slice(0, 4)}
          </text>
          <rect x="10" y="88" width="64" height="7" rx="3.5" fill="#1b2234" />
          <rect x="10" y="100" width="88" height="5" rx="2.5" fill="#c6cad5" />
          <rect x="10" y="110" width="76" height="5" rx="2.5" fill="#c6cad5" />
          <rect x="10" y="124" width="42" height="34" rx="6" fill="#eef1f6" />
          <rect x="56" y="124" width="42" height="34" rx="6" fill="#eef1f6" />
          <rect x="10" y="168" width="92" height="18" rx="9" fill={accent} />
        </g>
        <g transform="translate(170 64)">
          <rect width="118" height="40" rx="12" fill="#ffffff" />
          <text
            x="14"
            y="26"
            fontFamily={FONT}
            fontSize="16"
            fontWeight="800"
            fill="#1b2234"
          >
            {'R$' + (59 + Math.floor(rand() * 140))}
          </text>
          <rect x="74" y="12" width="32" height="16" rx="8" fill={colors.orange} />
          <rect x="0" y="54" width="92" height="30" rx="10" fill="#ffffff" opacity=".85" />
          <rect x="12" y="66" width="56" height="6" rx="3" fill="#c6cad5" />
          <rect x="0" y="96" width="110" height="30" rx="10" fill={accent} opacity=".9" />
          <text
            x="14"
            y="116"
            fontFamily={FONT}
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#ffffff"
          >
            DETALHES →
          </text>
        </g>
      </svg>
    )
  }

  if (kind === 'sale') {
    const confetti = Array.from({ length: 22 }, () => ({
      x: rand() * 320,
      y: rand() * 220,
      r: rand() * 180,
      c: pick(),
    }))
    return (
      <svg {...svg}>
        <rect width="320" height="220" fill={colors.yellow} />
        {confetti.map((c, i) => (
          <rect
            key={i}
            x={round1(c.x)}
            y={round1(c.y)}
            width="8"
            height="3.5"
            rx="1.5"
            fill={c.c}
            transform={`rotate(${round1(c.r)} ${round1(c.x)} ${round1(c.y)})`}
          />
        ))}
        <polygon
          points={Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2
            const r = i % 2 ? 54 : 68
            return round1(236 + Math.cos(a) * r) + ',' + round1(80 + Math.sin(a) * r)
          }).join(' ')}
          fill={colors.orange}
        />
        <text x="236" y="76" textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="900" fill="#ffffff">
          OFERTA
        </text>
        <text x="236" y="96" textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="700" letterSpacing="2" fill="#ffffff">
          HOJE
        </text>
        <text x="20" y="168" fontFamily={FONT} fontSize="78" fontWeight="900" letterSpacing="-3" fill="#1b2234">
          {mark}
        </text>
        <text x="22" y="196" fontFamily={FONT} fontSize="12" fontWeight="700" letterSpacing="4" fill="#1b2234" opacity=".6">
          TEMPO LIMITADO
        </text>
        <g transform="translate(24 30) rotate(-8)">
          <path d="M0 0 H74 L90 16 L74 32 H0Z" fill={colors.blue} />
          <circle cx="76" cy="16" r="4" fill={colors.yellow} />
          <text x="10" y="21" fontFamily={FONT} fontSize="12" fontWeight="800" fill="#ffffff">
            DEALS
          </text>
        </g>
      </svg>
    )
  }

  if (kind === 'brand') {
    const base = pick()
    return (
      <svg {...svg}>
        <rect width="320" height="220" fill={base === colors.yellow ? colors.orange : base} />
        {[0, 1, 2, 3, 4, 5].map((u) => {
          const x = 34 + (u % 3) * 90
          const y = 46 + Math.floor(u / 3) * 92
          const shape = Math.floor(rand() * 4)
          return (
            <g
              key={u}
              transform={`translate(${x} ${y})`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            >
              {shape === 0 && <circle cx="26" cy="26" r="22" />}
              {shape === 1 && <rect x="4" y="4" width="44" height="44" rx="12" />}
              {shape === 2 && <path d="M26 4 L48 46 H4Z" strokeLinejoin="round" />}
              {shape === 3 && <path d="M4 26 C14 4 38 4 48 26 C38 48 14 48 4 26Z" />}
              {u === 4 && (
                <text
                  x="26"
                  y="33"
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize="18"
                  fontWeight="900"
                  fill="#ffffff"
                  stroke="none"
                >
                  {mark.slice(0, 1)}
                </text>
              )}
            </g>
          )
        })}
        <text x="300" y="206" textAnchor="end" fontFamily={FONT} fontSize="11" fontWeight="700" letterSpacing="3" fill="#ffffff" opacity=".8">
          {mark}
        </text>
      </svg>
    )
  }

  const bg = pick()
  const circleColor = pick()
  const cx = 80 + rand() * 160
  const cy = 50 + rand() * 70
  return (
    <svg {...svg}>
      <rect width="320" height="220" fill={bg === colors.yellow ? colors.blue : bg} />
      <circle
        cx={round1(cx)}
        cy={round1(cy)}
        r={round1(56 + rand() * 30)}
        fill={circleColor === bg ? '#ffffff' : circleColor}
        opacity=".9"
      />
      <g stroke="#ffffff" strokeWidth="2" opacity=".28">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-40 + i * 44} y1="220" x2={60 + i * 44} y2="0" />
        ))}
      </g>
      <g fill="#ffffff" opacity=".8">
        {Array.from({ length: 20 }, (_, i) => (
          <circle key={i} cx={252 + (i % 4) * 12} cy={128 + Math.floor(i / 4) * 12} r="2" />
        ))}
      </g>
      <text x="16" y="28" fontFamily={FONT} fontSize="10" fontWeight="700" letterSpacing="2.5" fill="#ffffff">
        {'VOL.' + pad2(1 + Math.floor(rand() * 12))}
      </text>
      <text x="14" y="200" fontFamily={FONT} fontSize="64" fontWeight="900" letterSpacing="-2" fill="#ffffff">
        {mark}
      </text>
    </svg>
  )
}
