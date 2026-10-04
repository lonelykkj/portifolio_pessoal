import { useRef, useState, type PointerEvent } from 'react'
import { Folder } from '@/components/portfolio/Folder'
import { PalmMark } from '@/components/portfolio/icons'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { SkylinePhoto } from '@/components/portfolio/SkylinePhoto'
import { StrokeText } from '@/components/portfolio/StrokeText'
import { TONES } from '@/lib/tones'
import { hashString } from '@/lib/stroke'
import type { CSSVars } from '@/components/portfolio/cssVars'

export function About() {
  const { data, firstName, sheetProps } = usePortfolio()
  const { colors } = data
  const photoRef = useRef<HTMLDivElement>(null)
  const [activeEntry, setActiveEntry] = useState(Math.max(0, data.timeline.length - 1))
  const lastYear = data.years.split(/[–-]/).pop() || data.years

  const tilt = (event: PointerEvent) => {
    const el = photoRef.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg')
    el.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg')
  }
  const resetTilt = () => {
    photoRef.current?.style.setProperty('--ry', '0deg')
    photoRef.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('about')}>
      <SheetMeta id="about" />
      <SheetHeading id="about" tag={'#' + firstName} word="Sobre mim" withSignature />
      <div className="ftp-about">
        <div
          className="ftp-photo"
          ref={photoRef}
          onPointerMove={tilt}
          onPointerLeave={resetTilt}
        >
          <Folder
            tone="blue"
            tabAt={0.08}
            tab={data.name}
            bodyClass="ftp-photo-body"
          >
            <div className="ftp-photo-frame">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt={data.name}
                  width={300}
                  height={360}
                  style={{ maxWidth: 'none' }}
                />
              ) : (
                <SkylinePhoto name={data.name} seed={hashString(data.name)} />
              )}
            </div>
            <div className="ftp-photo-glass" style={{ color: 'var(--ftp-blue)' }}>
              <PalmMark size={28} />
              <StrokeText text={lastYear} weight={9} color="var(--ftp-ink)" decorative />
            </div>
          </Folder>
        </div>

        <div>
          <p className="ftp-hi">
            <span style={{ color: 'var(--ftp-blue)' }}>
              <PalmMark size={34} />
            </span>
            <span>
              {data.greeting} <b>{data.localName || data.name}</b>!
              {data.localName ? (
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: '.5em',
                    marginLeft: 12,
                    color: 'var(--ftp-muted)',
                  }}
                >
                  {data.name}
                </span>
              ) : null}
            </span>
          </p>
          <p className="ftp-kicker" style={{ marginTop: 12, maxWidth: 560 }}>
            {data.blurb}
          </p>

          {data.highlights.length > 0 && (
            <div className="ftp-cols">
              {data.highlights.map((h, i) => (
                <div key={h.label + i}>
                  <span
                    className="ftp-badge"
                    style={{
                      background: colors[h.tone ?? (i % 2 ? 'blue' : 'green')],
                      color: h.tone === 'yellow' ? '#5d5434' : '#fff',
                    }}
                  >
                    {h.label}
                  </span>
                  <ul>
                    {h.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {data.timeline.length > 0 && (
            <div className="ftp-tl">
              <span className="ftp-badge" style={{ background: colors.blue, color: '#fff' }}>
                Experiência
              </span>
              <ol className="ftp-tl-track" style={{ '--n': data.timeline.length } as CSSVars}>
                {data.timeline.map((entry, i) => (
                  <li
                    key={entry.from + i}
                    className="ftp-tl-item"
                    data-on={activeEntry === i ? 'true' : 'false'}
                    onPointerEnter={() => setActiveEntry(i)}
                    onFocus={() => setActiveEntry(i)}
                    tabIndex={0}
                  >
                    <span className="ftp-tl-date" style={{ display: 'block' }}>
                      {entry.from}–{entry.to}
                    </span>
                    <span className="ftp-tl-dot" />
                    <span style={{ display: 'block' }}>
                      <span className="ftp-tl-title" style={{ display: 'block' }}>
                        {entry.title}
                      </span>
                      {entry.place && <span className="ftp-tl-place">{entry.place}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {data.contacts.length > 0 && (
            <div className="ftp-contacts">
              {data.contacts.map((contact, i) => {
                const content = (
                  <>
                    <i style={{ background: colors[TONES[i % 3]], color: '#fff' }}>
                      {contact.label.slice(0, 1)}
                    </i>
                    {contact.value}
                  </>
                )
                return contact.href ? (
                  <a
                    key={contact.label}
                    className="ftp-contact"
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${contact.label}: ${contact.value}`}
                  >
                    {content}
                  </a>
                ) : (
                  <span key={contact.label} className="ftp-contact">
                    {content}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
