import { useState } from 'react'
import { Arrow } from '@/components/portfolio/icons'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { TONES } from '@/lib/tones'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { StepArt } from '@/components/portfolio/StepArt'
import { TabBar } from '@/components/portfolio/TabBar'
import { pad2 } from '@/lib/stroke'

export function Process() {
  const { uid, data, sheetProps } = usePortfolio()
  const { steps } = data
  const [selected, setSelected] = useState(0)
  const current = Math.min(selected, steps.length - 1)
  const step = steps[current]
  const tone = (i: number) => TONES[i % TONES.length]

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('process')}>
      <SheetMeta id="process" />
      <SheetHeading id="process" tag={`(${pad2(steps.length)})`} word="Processo" />
      <TabBar
        items={steps.map((s, i) => ({
          id: String(i),
          label: `${pad2(i + 1)} ${s.title}`,
          tone: tone(i),
        }))}
        active={String(current)}
        onChange={(id) => setSelected(Number(id))}
        label="Etapas do processo"
        idBase={`${uid}-ps`}
      />
      <div
        className="ftp-panel"
        data-tone={tone(current)}
        role="tabpanel"
        id={`${uid}-ps-panel`}
        aria-labelledby={`${uid}-ps-tab-${current}`}
      >
        <div className="ftp-step" key={current}>
          <div>
            <div className="ftp-step-n">{pad2(current + 1)}</div>
            <h3 className="ftp-step-t">
              {step.title}
              {step.local && <span className="ftp-step-l">{step.local}</span>}
            </h3>
            {step.duration && <span className="ftp-step-d">{step.duration}</span>}
            <StepArt index={current} />
          </div>
          <div>
            <p className="ftp-step-b">{step.body}</p>
            {step.outputs && step.outputs.length > 0 && (
              <ul className="ftp-step-o">
                {step.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            )}
            <div className="ftp-dots" aria-hidden="true">
              {steps.map((_, i) => (
                <span key={i} data-on={i === current ? 'true' : 'false'} />
              ))}
            </div>
            <div className="ftp-btns" style={{ marginTop: 22 }}>
              <button
                type="button"
                className="ftp-btn"
                data-ghost="true"
                onClick={() => setSelected((current - 1 + steps.length) % steps.length)}
                aria-label="Etapa anterior"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                className="ftp-btn"
                onClick={() => setSelected((current + 1) % steps.length)}
              >
                Próxima etapa <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
