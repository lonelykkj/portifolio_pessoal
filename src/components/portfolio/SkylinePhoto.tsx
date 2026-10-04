import { useId, useMemo } from 'react'
import { round1, seededRandom } from '@/lib/stroke'
import type { CSSVars } from './cssVars'

/** Ilustração usada quando nenhuma foto é informada. */
export function SkylinePhoto({ name, seed }: { name: string; seed: number }) {
  const id = useId().replace(/:/g, '')

  const scene = useMemo(() => {
    const rand = seededRandom(seed)
    const buildings: { x: number; w: number; h: number; spire: boolean }[] = []
    let x = -6
    while (x < 306) {
      const w = 14 + rand() * 26
      const tall = rand() < 0.18
      buildings.push({
        x,
        w,
        h: tall ? 90 + rand() * 40 : 26 + rand() * 52,
        spire: tall && rand() < 0.6,
      })
      x += w + (rand() < 0.3 ? 2 : 0)
    }
    const windows: { x: number; y: number; on: boolean; dl: number }[] = []
    for (const b of buildings)
      for (let y = 196 - b.h + 6; y < 190; y += 7)
        for (let wx = b.x + 3; wx < b.x + b.w - 4; wx += 6)
          if (rand() < 0.34)
            windows.push({ x: wx, y, on: rand() < 0.2, dl: rand() * 3 })
    const rocks = Array.from({ length: 14 }, () => ({
      x: rand() * 300,
      y: 300 + rand() * 56,
      rx: 4 + rand() * 12,
      ry: 2 + rand() * 5,
    }))
    return { buildings, windows, rocks }
  }, [seed])

  return (
    <svg
      viewBox="0 0 300 360"
      width={300}
      height={360}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={'Foto de ' + name}
    >
      <defs>
        <linearGradient id={id + '-sky'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b4a8f" />
          <stop offset=".42" stopColor="#6d8ed2" />
          <stop offset=".72" stopColor="#d9b4c9" />
          <stop offset="1" stopColor="#f5d2b0" />
        </linearGradient>
        <linearGradient id={id + '-sea'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a7fb4" />
          <stop offset=".5" stopColor="#3a5288" />
          <stop offset="1" stopColor="#1f2f55" />
        </linearGradient>
        <linearGradient id={id + '-coat'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#24252c" />
          <stop offset=".6" stopColor="#111217" />
          <stop offset="1" stopColor="#060608" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="232" cy="172" r="16" fill="#ffe2c2" opacity=".7" />
      <g fill="#273863">
        {scene.buildings.map((b, i) => (
          <g key={i}>
            <rect
              x={round1(b.x)}
              y={round1(196 - b.h)}
              width={round1(b.w)}
              height={round1(b.h)}
            />
            {b.spire && (
              <rect
                x={round1(b.x + b.w / 2 - 1)}
                y={round1(196 - b.h - 18)}
                width="2"
                height="18"
              />
            )}
          </g>
        ))}
      </g>
      <g>
        {scene.windows.map((w, i) => (
          <rect
            key={i}
            x={round1(w.x)}
            y={round1(w.y)}
            width="2.4"
            height="2.8"
            fill={i % 5 ? '#ffd68a' : '#a8dcff'}
            className={w.on ? 'ftp-twinkle' : undefined}
            style={w.on ? ({ '--dl': round1(w.dl) + 's' } as CSSVars) : undefined}
            opacity=".9"
          />
        ))}
      </g>
      <rect y="196" width="300" height="104" fill={`url(#${id}-sea)`} />
      <g fill="#273863" opacity=".35" transform="translate(0 392) scale(1 -1)">
        {scene.buildings.map((b, i) => (
          <rect
            key={i}
            x={round1(b.x)}
            y={round1(196 - b.h * 0.6)}
            width={round1(b.w)}
            height={round1(b.h * 0.6)}
          />
        ))}
      </g>
      <g
        className="ftp-shimmer"
        stroke="#ffe0b0"
        strokeLinecap="round"
        opacity=".55"
      >
        {[206, 214, 223, 233, 246, 262].map((y, i) => (
          <line
            key={y}
            x1={30 + ((i * 47) % 140)}
            x2={70 + ((i * 47) % 140) + i * 9}
            y1={y}
            y2={y}
            strokeWidth={1.2 + i * 0.2}
          />
        ))}
      </g>
      <g transform="translate(48 204)">
        <path d="M0 8 H58 L52 14 H6 Z" fill="#e9edf6" />
        <rect x="10" y="2" width="34" height="6" rx="1" fill="#f5f7fb" />
        <rect x="16" y="-3" width="16" height="5" rx="1" fill="#dfe6f3" />
        {[13, 19, 25, 31, 37].map((x) => (
          <rect
            key={x}
            x={x}
            y="4"
            width="3"
            height="2"
            fill="#ffcf7a"
            className="ftp-twinkle"
            style={{ '--dl': x / 20 + 's' } as CSSVars}
          />
        ))}
      </g>
      <path
        d="M0 296 C40 284 70 292 110 286 C160 278 200 290 240 282 C268 277 288 284 300 280 V360 H0Z"
        fill="#2a2522"
      />
      <g fill="#3b3430">
        {scene.rocks.map((r, i) => (
          <ellipse
            key={i}
            cx={round1(r.x)}
            cy={round1(r.y)}
            rx={round1(r.rx)}
            ry={round1(r.ry)}
          />
        ))}
      </g>
      <g>
        <path
          d="M142 360 C138 316 140 262 152 236 C160 218 178 210 196 212 C214 214 226 228 232 254 C238 284 240 326 238 360 Z"
          fill={`url(#${id}-coat)`}
        />
        <path
          d="M176 214 C180 224 186 230 194 232 C198 226 200 220 200 213 C192 210 184 210 176 214Z"
          fill="#0a0a0d"
        />
        <rect x="181" y="198" width="14" height="18" rx="5" fill="#d9b49a" />
        <ellipse cx="186" cy="184" rx="16" ry="19" fill="#e2bfa3" />
        <path
          d="M170 182 C166 160 182 152 198 157 C208 161 207 177 204 190 C200 182 196 176 188 172 C181 172 174 176 170 182Z"
          fill="#131315"
        />
        <path
          d="M171 186 C169 190 170 194 173 195"
          fill="none"
          stroke="#c99f84"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M156 262 C160 276 168 288 178 292"
          fill="none"
          stroke="#2c2d35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="172"
          y="282"
          width="14"
          height="22"
          rx="3"
          fill="#d6393b"
          transform="rotate(-12 179 293)"
        />
      </g>
    </svg>
  )
}
