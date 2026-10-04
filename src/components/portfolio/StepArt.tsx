import { pad2 } from '@/lib/stroke'

/** Pequena ilustração de linhas para cada etapa do processo. */
export function StepArt({ index }: { index: number }) {
  const variant = index % 4
  return (
    <svg
      className="ftp-step-art"
      viewBox="0 0 320 120"
      width={320}
      height={120}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {variant === 0 && (
        <g>
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={20 + (i % 9) * 22}
              cy={30 + Math.floor(i / 9) * 40}
              r={i === 6 ? 6 : 3}
              fill={i === 6 ? 'currentColor' : 'none'}
            />
          ))}
          <circle cx="160" cy="44" r="30" />
          <path d="M182 66 L214 98" strokeWidth="5" />
        </g>
      )}
      {variant === 1 && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <text
                x="10"
                y={22 + i * 28}
                fontSize="14"
                fontWeight="700"
                fill="currentColor"
                stroke="none"
              >
                {pad2(i + 1)}
              </text>
              <rect
                x="44"
                y={10 + i * 28}
                width={230 - i * 46}
                height="14"
                rx="7"
                fill={i === 0 ? 'currentColor' : 'none'}
              />
            </g>
          ))}
        </g>
      )}
      {variant === 2 && (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={10 + (i % 6) * 50}
              y={10 + Math.floor(i / 6) * 54}
              width="42"
              height="46"
              rx="8"
              fill={i === 3 || i === 8 ? 'currentColor' : 'none'}
            />
          ))}
        </g>
      )}
      {variant === 3 && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${20 + i * 30} ${40 - i * 12})`}>
              <path
                d="M0 14 H24 L34 4 H70 V76 H0Z"
                fill={i === 2 ? 'currentColor' : 'none'}
              />
            </g>
          ))}
          <path d="M190 58 H290 M262 34 L292 58 L262 82" strokeWidth="4" />
        </g>
      )}
    </svg>
  )
}
