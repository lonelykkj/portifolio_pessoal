import { Arrow } from '@/components/portfolio/icons'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { pad2 } from '@/lib/stroke'
import type { Clock } from '@/hooks/useClock'
import type { SheetId } from '@/types/portfolio'

interface SiteFooterProps {
  active: SheetId
  clock: Clock | null
}

export function SiteFooter({ active, clock }: SiteFooterProps) {
  const { data, pageNumber, scrollTo } = usePortfolio()
  const lastYear = data.years.split(/[–-]/).pop()
  const place =
    data.timeZoneLabel ?? data.timeZone.split('/').pop()?.replace(/_/g, ' ')

  return (
    <footer className="ftp-foot">
      <span>
        {data.disciplines[0]}
        <small>
          © {lastYear} {data.name}
        </small>
      </span>
      <span>E</span>
      {clock && (
        <span className="ftp-clock">
          <i data-day={clock.day ? 'true' : 'false'} />
          {clock.time} · {place}
        </span>
      )}
      <button type="button" className="ftp-top" onClick={() => scrollTo('cover')}>
        Voltar ao topo <Arrow dir="up" size={12} />
      </button>
      <span className="ftp-foot-n" aria-hidden="true">
        {pad2(pageNumber(active))}
      </span>
    </footer>
  )
}
