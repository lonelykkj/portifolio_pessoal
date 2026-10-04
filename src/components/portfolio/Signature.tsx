import { useMemo } from 'react'
import { signaturePath } from '@/lib/stroke'
import type { CSSVars } from './cssVars'

interface SignatureProps {
  text: string
  className?: string
  delay?: number
  weight?: number
}

export function Signature({
  text,
  className,
  delay = 0,
  weight = 3.2,
}: SignatureProps) {
  const sig = useMemo(() => signaturePath(text), [text])
  const width = sig.width + 34

  return (
    <svg
      className={'ftp-sig' + (className ? ' ' + className : '')}
      viewBox={`-30 -2 ${width} 106`}
      width={width}
      height={106}
      aria-hidden="true"
      style={{ '--d': delay + 'ms' } as CSSVars}
    >
      <path
        d={sig.d}
        transform="skewX(-14)"
        fill="none"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="ftp-draw"
      />
    </svg>
  )
}
