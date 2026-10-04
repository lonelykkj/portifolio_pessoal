import { useMemo } from 'react'
import { bloomPath } from '@/lib/stroke'

export function Bloom({ className }: { className?: string }) {
  const large = useMemo(() => bloomPath(7), [])
  const small = useMemo(() => bloomPath(19, 300), [])

  return (
    <svg
      className={className}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      aria-hidden="true"
    >
      <path d={large} fill="currentColor" />
      <g transform="translate(150 150) rotate(28 150 150)">
        <path d={small} fill="currentColor" opacity=".7" />
      </g>
      <path
        d="M40 390 Q110 110 370 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
