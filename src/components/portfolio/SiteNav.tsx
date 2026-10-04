import { useLayoutEffect, useRef, useState } from 'react'
import { pad2 } from '@/lib/stroke'
import type { SheetId } from '@/types/portfolio'
import { ThemeIcon } from './icons'
import { usePortfolio } from './PortfolioContext'

interface SiteNavProps {
  active: SheetId
  dark: boolean
  onToggleTheme: () => void
}

/** Barra de navegação fixa com indicador deslizante. */
export function SiteNav({ active, dark, onToggleTheme }: SiteNavProps) {
  const { sheets, pageNumber, scrollTo } = usePortfolio()
  const links = useRef<HTMLDivElement>(null)
  const buttons = useRef<Partial<Record<SheetId, HTMLButtonElement | null>>>({})
  const [indicator, setIndicator] = useState({ x: 0, w: 0 })

  useLayoutEffect(() => {
    const button = buttons.current[active]
    if (!button) return
    setIndicator({ x: button.offsetLeft, w: button.offsetWidth })
    const strip = links.current
    if (strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({
        left: button.offsetLeft - strip.clientWidth / 2 + button.offsetWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [active, sheets])

  return (
    <div className="ftp-navwrap">
      <nav className="ftp-nav" aria-label="Páginas do portfólio">
        <span className="ftp-count" aria-hidden="true">
          {pad2(pageNumber(active))}
          <small>/{pad2(sheets.length)}</small>
        </span>
        <div className="ftp-links" ref={links}>
          <span
            className="ftp-ind"
            style={{
              transform: `translateX(${indicator.x}px)`,
              width: indicator.w,
              opacity: indicator.w ? 1 : 0,
            }}
          />
          {sheets.map((sheet) => (
            <button
              key={sheet.id}
              type="button"
              ref={(el) => {
                buttons.current[sheet.id] = el
              }}
              className="ftp-link"
              aria-current={active === sheet.id ? 'true' : undefined}
              onClick={() => scrollTo(sheet.id)}
            >
              {sheet.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ftp-icon"
          onClick={onToggleTheme}
          aria-label={dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
        >
          <ThemeIcon dark={dark} />
        </button>
      </nav>
    </div>
  )
}
