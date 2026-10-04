import { Folder } from '@/components/portfolio/Folder'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { TONES } from '@/lib/tones'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { pad2 } from '@/lib/stroke'

const TAB_POSITIONS = [0.1, 0.5, 0.86]
const ROTATIONS = [-2, 1.5, -1]

export function Words() {
  const { data, sheetProps } = usePortfolio()
  const { words, colors } = data

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('words')}>
      <SheetMeta id="words" />
      <SheetHeading id="words" tag={`(${pad2(words.length)})`} word="Elogios" label="Avaliações" />
      <div className="ftp-words">
        <span
          className="ftp-blob"
          style={{ left: '8%', top: '18%', width: 220, height: 220, background: colors.blue, opacity: 0.85 }}
        />
        <span
          className="ftp-blob"
          style={{ left: '46%', top: '40%', width: 180, height: 180, background: colors.green, opacity: 0.85 }}
        />
        <span
          className="ftp-blob"
          style={{ right: '6%', top: '8%', width: 150, height: 150, background: colors.orange, opacity: 0.8 }}
        />
        {words.map((word, i) => (
          <Folder
            key={word.name + i}
            as="figure"
            tone={word.tone ?? TONES[i % 3]}
            glass
            tabAt={TAB_POSITIONS[i % 3]}
            className="ftp-word"
            style={{ '--rot': ROTATIONS[i % 3] + 'deg' }}
            tab={word.name.split(/\s+/)[0]}
          >
            <blockquote>{word.quote}</blockquote>
            <figcaption>
              <b>{word.name}</b>
              {word.role}
            </figcaption>
          </Folder>
        ))}
      </div>
    </section>
  )
}
