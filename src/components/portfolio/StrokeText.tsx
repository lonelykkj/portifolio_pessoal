import { useMemo } from 'react'
import { layoutText, round1, splitSubpaths } from '@/lib/stroke'
import type { CSSVars } from './cssVars'

interface StrokeTextProps {
  text: string
  weight?: number
  outline?: number
  tracking?: number
  ligatures?: boolean
  color?: string
  inner?: string
  delay?: number
  className?: string
  label?: string
  decorative?: boolean
}

/** Texto desenhado traço a traço com as fontes vetoriais do template. */
export function StrokeText({
  text,
  weight = 8,
  outline = 0,
  tracking = 26,
  ligatures = true,
  color = 'currentColor',
  inner = 'var(--ftp-sheet)',
  delay = 0,
  className,
  label,
  decorative,
}: StrokeTextProps) {
  const layout = useMemo(
    () => layoutText(text, tracking + weight * 0.6, ligatures),
    [text, tracking, weight, ligatures],
  )
  const pad = weight / 2 + 2
  const width = round1(layout.width + pad * 2)
  const height = round1(124 + pad * 2)
  const layers =
    outline > 0
      ? [
          { color, width: weight },
          { color: inner, width: Math.max(0.5, weight - outline * 2) },
        ]
      : [{ color, width: weight }]

  return (
    <svg
      className={'ftp-st' + (className ? ' ' + className : '')}
      viewBox={`${round1(-pad)} ${round1(-12 - pad)} ${width} ${height}`}
      width={width}
      height={height}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : (label ?? text)}
      aria-hidden={decorative ? true : undefined}
      style={{ '--d': delay + 'ms' } as CSSVars}
    >
      {layers.map((layer, layerIndex) => (
        <g
          key={layerIndex}
          fill="none"
          stroke={layer.color}
          strokeWidth={layer.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {layout.items.map((item, i) => (
            <g key={i} transform={`translate(${round1(item.x)} 0)`}>
              <g className="ftp-gl" style={{ '--i': i } as CSSVars}>
                {splitSubpaths(item.d).map((d, j) => (
                  <path key={j} d={d} pathLength={1} className="ftp-draw" />
                ))}
              </g>
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}
