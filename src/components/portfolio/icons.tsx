import { useId } from 'react'

const ROTATION = { right: 0, down: 90, left: 180, up: -90, ne: -45 }

export function Arrow({
  size = 14,
  dir = 'right',
}: {
  size?: number
  dir?: keyof typeof ROTATION
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ transform: `rotate(${ROTATION[dir]}deg)` }}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PalmMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M15.5 30c.6-6 .9-11 .2-17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16 13C12 7 6 7 2.5 10.5 7 9.5 11 10.5 16 13Zm0 0c1-6 6-10 11.5-8.5C22 5 18.5 8 16 13Zm0 0c4.5-3 10-2 13 2.5-4.5-2-8.5-2.5-13-2.5Zm0 0C10.5 11 5 14 4 19c3.5-4 7-5.5 12-6Zm0 0c-1-4.5-4-8.5-8.5-10C10 6 13 9 16 13Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ThemeIcon({ dark }: { dark: boolean }) {
  const maskId = useId().replace(/:/g, '') + '-moon'
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <mask id={maskId}>
        <rect width="24" height="24" fill="#fff" />
        <circle
          className="ftp-sun-moon"
          cx={dark ? 16 : 30}
          cy={dark ? 7 : -6}
          r="6.5"
          fill="#000"
        />
      </mask>
      <circle
        className="ftp-sun-core"
        cx="12"
        cy="12"
        r={dark ? 8 : 4.5}
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
      <g
        className="ftp-sun-rays"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
      </g>
    </svg>
  )
}
