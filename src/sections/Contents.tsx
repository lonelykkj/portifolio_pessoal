import { useState } from 'react'
import { Arrow } from '@/components/portfolio/icons'
import { Folder } from '@/components/portfolio/Folder'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { pad2 } from '@/lib/stroke'

const TAB_POSITIONS = [0.62, 0.08, 0.84, 0.3, 0.7, 0.18]

export function Contents() {
  const { uid, data, sheets, pageNumber, scrollTo, sheetProps } = usePortfolio()
  const [open, setOpen] = useState(0)

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('contents')}>
      <SheetMeta id="contents" />
      <SheetHeading
        id="contents"
        tag={`(${pad2(data.chapters.length)})`}
        word="Indice"
        label="Índice"
        kicker={`Índice do portfólio de ${data.name} (${data.years}). Abra uma pasta para ver o que há dentro.`}
      />
      <div className="ftp-band-list">
        {data.chapters.map((chapter, i) => {
          const isOpen = open === i
          const canGo = sheets.some((s) => s.id === chapter.target)
          return (
            <Folder
              key={chapter.title + i}
              tone={isOpen ? 'blue' : 'sheet'}
              tabAt={TAB_POSITIONS[i % TAB_POSITIONS.length]}
              className="ftp-band"
              data-open={isOpen ? 'true' : 'false'}
              tab={
                <>
                  {'Capítulo ' + (i + 1)}
                  <Arrow size={12} />
                </>
              }
            >
              <button
                type="button"
                className="ftp-band-head"
                aria-expanded={isOpen}
                aria-controls={`${uid}-ch-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="ftp-band-n">{pad2(i + 1)}</span>
                <span style={{ minWidth: 0 }}>
                  <span className="ftp-band-t" style={{ display: 'block' }}>
                    {chapter.title}
                  </span>
                  {isOpen && chapter.local && (
                    <span className="ftp-band-local">{chapter.local}</span>
                  )}
                </span>
                {isOpen && chapter.points && chapter.points.length > 0 && (
                  <ul className="ftp-band-pts">
                    {chapter.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </button>
              <div className="ftp-band-fold" id={`${uid}-ch-${i}`}>
                <div>
                  {canGo && (
                    <div className="ftp-band-go">
                      <p>
                        {`Capítulo ${pad2(i + 1)} · página ${pad2(pageNumber(chapter.target))}`}
                      </p>
                      <button
                        type="button"
                        className="ftp-go"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => scrollTo(chapter.target)}
                      >
                        Abrir capítulo <Arrow size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Folder>
          )
        })}
      </div>
    </section>
  )
}
