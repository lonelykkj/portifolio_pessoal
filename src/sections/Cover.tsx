import { Arrow } from '@/components/portfolio/icons'
import { Bloom } from '@/components/portfolio/Bloom'
import { Folder } from '@/components/portfolio/Folder'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { SheetMeta } from '@/components/portfolio/SheetFrame'
import { Signature } from '@/components/portfolio/Signature'
import { StrokeText } from '@/components/portfolio/StrokeText'
import { pad2 } from '@/lib/stroke'
import type { CSSVars } from '@/components/portfolio/cssVars'

/** Posição de cada pasta no leque da capa. */
const DECK = [
  { l: 0, w: 38, t: 8, tab: 0.16 },
  { l: 28, w: 34, t: 0, tab: 0.7 },
  { l: 57, w: 43, t: 14, tab: 0.12 },
  { l: 2, w: 41, t: 70, tab: 0.06 },
  { l: 24, w: 39, t: 92, tab: 0.5 },
  { l: 60, w: 40, t: 100, tab: 0.3 },
]

interface CoverProps {
  onOpenCategory: (id: string) => void
}

export function Cover({ onOpenCategory }: CoverProps) {
  const { uid, data, signature, scrollTo, sheetProps } = usePortfolio()
  const count = (id: string) => data.projects.filter((p) => p.category === id).length

  const deck = data.categories
    .slice(0, DECK.length)
    .map((category, i) => ({ category, i, slot: DECK[i] }))
    .sort((a, b) => a.slot.t - b.slot.t)
  const quickLinks = data.categories.slice(0, 3)

  return (
    <section className="ftp-sheet ftp-cover" {...sheetProps('cover')}>
      <SheetMeta id="cover" bar />
      <div className="ftp-cover-top">
        <Bloom className="ftp-palm" />
        <span className="ftp-plus" style={{ left: -14, top: 8 }} />
        <span className="ftp-plus" style={{ right: -14, top: 8 }} />
        <StrokeText
          text={data.tag}
          className="ftp-cover-tag"
          weight={8}
          outline={1.4}
          color="var(--ftp-muted)"
          decorative
        />
        <h1 id={`${uid}-cover-h`} style={{ position: 'relative' }}>
          <StrokeText
            text={data.word}
            className="ftp-cover-word"
            weight={9}
            outline={1.9}
            tracking={22}
            color="var(--ftp-blue)"
            delay={150}
            label={`${data.word} — ${data.name}`}
          />
        </h1>
      </div>

      <div className="ftp-cover-mid">
        <div className="ftp-sub">
          {data.subtitle.map((part, i) =>
            i % 2 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>,
          )}
          <Signature text={signature} className="ftp-sub-sig" delay={900} />
        </div>
        <div>
          <button type="button" className="ftp-pill" onClick={() => scrollTo('about')}>
            {data.localName ? data.localName + ' · ' : ''}
            {data.role}
            <span className="ftp-pill-arrow">
              <Arrow dir="down" />
            </span>
          </button>
          <div className="ftp-qlinks">
            {quickLinks.map((c) => (
              <button
                key={c.id}
                type="button"
                className="ftp-qlink"
                onClick={() => onOpenCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="ftp-blurb">{data.blurb}</p>
        </div>
      </div>

      {deck.length > 0 && (
        <div
          className="ftp-deck"
          style={{ '--dhm': 54 * deck.length + 140 + 'px' } as CSSVars}
        >
          {deck.map(({ category, i, slot }) => {
            const n = count(category.id)
            return (
              <Folder
                key={category.id}
                as="button"
                tone={category.tone}
                glass={slot.t > 40}
                tabAt={slot.tab}
                className="ftp-dfold ftp-dfold-btn"
                style={{
                  '--l': slot.l,
                  '--w': slot.w,
                  '--t': slot.t + 'px',
                  '--mt': i * 54 + 'px',
                }}
                tab={
                  <>
                    {category.label}
                    <span className="ftp-tchip">{pad2(n)}</span>
                    <Arrow size={11} />
                  </>
                }
                onClick={() => onOpenCategory(category.id)}
                aria-label={`Abrir ${category.label}, ${n} ${n === 1 ? 'projeto' : 'projetos'}`}
              >
                <span className="ftp-dl">
                  <span className="ftp-dl-local">{category.local || category.label}</span>
                  <span className="ftp-dl-n">{pad2(i + 1)}</span>
                </span>
                <span className="ftp-dl-en" style={{ display: 'block' }}>
                  {category.label} · {n} {n === 1 ? 'projeto' : 'projetos'}
                </span>
                {i === 2 && <span className="ftp-dl-years">{data.years}</span>}
              </Folder>
            )
          })}
        </div>
      )}
    </section>
  )
}
