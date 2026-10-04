import { pad2 } from '@/lib/stroke'
import type { SheetId } from '@/types/portfolio'
import { Signature } from './Signature'
import { StrokeText } from './StrokeText'
import { SHEETS, usePortfolio } from './PortfolioContext'

/** Faixa de metadados no topo de cada página. */
export function SheetMeta({ id, bar }: { id: SheetId; bar?: boolean }) {
  const { data, sheets, pageNumber } = usePortfolio()
  return (
    <div className={'ftp-meta' + (bar ? ' ftp-meta-bar' : '')} aria-hidden="true">
      <span>{data.years}</span>
      {data.disciplines.slice(0, 3).map((d) => (
        <span key={d}>{d}</span>
      ))}
      <span data-on="true">{SHEETS.find((s) => s.id === id)?.page}</span>
      <span>
        {pad2(pageNumber(id))} / {pad2(sheets.length)}
      </span>
    </div>
  )
}

interface SheetHeadingProps {
  id: SheetId
  tag: string
  word: string
  /** Texto acessível, quando o desenho não comporta acentos. */
  label?: string
  withSignature?: boolean
  kicker?: string
}

/** Título de página desenhado com traços, com marcas de registro nos cantos. */
export function SheetHeading({
  id,
  tag,
  word,
  label,
  withSignature,
  kicker,
}: SheetHeadingProps) {
  const { uid, signature } = usePortfolio()
  return (
    <div className="ftp-head">
      <span className="ftp-plus" style={{ left: -18, top: -6 }} />
      <span className="ftp-plus" style={{ right: -18, top: -6 }} />
      <StrokeText
        text={tag}
        className="ftp-head-tag"
        weight={9}
        outline={1.6}
        color="var(--ftp-faint)"
        decorative
      />
      <div className="ftp-head-row">
        <h2 id={`${uid}-${id}-h`} style={{ minWidth: 0, flex: '1 1 auto' }}>
          <StrokeText
            text={word}
            label={label}
            className="ftp-head-word"
            weight={10}
            outline={2.2}
            color="var(--ftp-blue)"
          />
        </h2>
      </div>
      {withSignature && (
        <Signature text={signature} className="ftp-head-sig" delay={500} />
      )}
      {kicker && (
        <p className="ftp-kicker" style={{ marginTop: 14 }}>
          {kicker}
        </p>
      )}
    </div>
  )
}
