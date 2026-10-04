import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefCallback,
} from 'react'
import { Contact } from '@/sections/Contact'
import { Contents } from '@/sections/Contents'
import { About } from '@/sections/About'
import { Cover } from '@/sections/Cover'
import { Process } from '@/sections/Process'
import { SiteFooter } from '@/sections/SiteFooter'
import { Words } from '@/sections/Words'
import { Work } from '@/sections/Work'
import { useClock } from '@/hooks/useClock'
import { useReveal } from '@/hooks/useReveal'
import { useTheme, type Theme } from '@/hooks/useTheme'
import type { PortfolioData, SheetId } from '@/types/portfolio'
import { PortfolioContext, SHEETS, type PortfolioContextValue } from './PortfolioContext'
import { ProjectModal } from './ProjectModal'
import { SiteNav } from './SiteNav'
import { StrokeText } from './StrokeText'
import type { CSSVars } from './cssVars'

interface PortfolioProps {
  data: PortfolioData
  defaultTheme?: Theme
  height?: string
}

export function Portfolio({ data, defaultTheme = 'dark', height = '100svh' }: PortfolioProps) {
  const uid = useId().replace(/:/g, '')
  const root = useRef<HTMLDivElement>(null)
  const sheetEls = useRef<Partial<Record<SheetId, HTMLElement | null>>>({})
  const lastFocused = useRef<Element | null>(null)

  const [theme, toggleTheme] = useTheme(defaultTheme)
  const [active, setActive] = useState<SheetId>('cover')
  const [filter, setFilter] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null)
  const clock = useClock(data.timeZone)

  const { projects, categories, chapters, steps, words, colors } = data
  const firstName = data.name.split(/\s+/)[0] || data.name
  const signature = data.signature ?? firstName

  const sheets = useMemo(
    () =>
      SHEETS.filter((s) => {
        if (s.id === 'contents') return chapters.length > 0
        if (s.id === 'work') return projects.length > 0
        if (s.id === 'process') return steps.length > 0
        if (s.id === 'words') return words.length > 0
        return true
      }),
    [chapters.length, projects.length, steps.length, words.length],
  )

  const pageNumber = useCallback(
    (id: SheetId) => sheets.findIndex((s) => s.id === id) + 1,
    [sheets],
  )

  const scrollTo = useCallback((id: SheetId) => {
    const el = sheetEls.current[id]
    if (!el) return
    const reduce =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [])

  const sheetProps = useCallback<PortfolioContextValue['sheetProps']>(
    (id) => ({
      id: `${uid}-${id}`,
      'data-sheet': id,
      ref: ((el) => {
        sheetEls.current[id] = el
      }) as RefCallback<HTMLElement>,
      'aria-labelledby': `${uid}-${id}-h`,
    }),
    [uid],
  )

  const context = useMemo<PortfolioContextValue>(
    () => ({ uid, data, sheets, firstName, signature, scrollTo, pageNumber, sheetProps }),
    [uid, data, sheets, firstName, signature, scrollTo, pageNumber, sheetProps],
  )

  // Página ativa conforme a rolagem.
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive((entry.target as HTMLElement).dataset.sheet as SheetId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const sheet of sheets) {
      const el = sheetEls.current[sheet.id]
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sheets])

  useReveal(root, [sheets])

  // Aviso temporário.
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const showToast = useCallback(
    (text: string) => setToast({ id: Date.now(), text }),
    [],
  )

  const copyEmail = useCallback(() => {
    const done = () => showToast('Copiado: ' + data.email)
    const fallback = () => {
      const area = document.createElement('textarea')
      area.value = data.email
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
        done()
      } catch {
        showToast(data.email)
      }
      area.remove()
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(data.email).then(done, fallback)
    } else {
      fallback()
    }
  }, [data.email, showToast])

  // Projetos visíveis no filtro atual (navegação do modal).
  const visible = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => filter === 'all' || project.category === filter),
    [projects, filter],
  )

  const openProject = (index: number) => {
    lastFocused.current = document.activeElement
    setOpenIndex(index)
  }

  const closeProject = useCallback(() => {
    setOpenIndex(null)
    ;(lastFocused.current as HTMLElement | null)?.focus?.()
  }, [])

  const stepProject = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current == null || !visible.length) return current
        const position = visible.findIndex((v) => v.index === current)
        return visible[(position + delta + visible.length) % visible.length].index
      })
    },
    [visible],
  )

  const openCategory = (id: string) => {
    setFilter(id)
    scrollTo('work')
  }

  const project = openIndex != null ? projects[openIndex] : null

  const rootStyle: CSSVars = {
    minHeight: height,
    '--ftp-blue': colors.blue,
    '--ftp-green': colors.green,
    '--ftp-orange': colors.orange,
    '--ftp-yellow': colors.yellow,
  }

  return (
    <PortfolioContext.Provider value={context}>
      <div ref={root} className="ftp-root" data-theme={theme} style={rootStyle}>
        <header className="ftp-mast">
          <div className="ftp-mast-strip" />
          <div className="ftp-mast-row">
            <MastheadTab word={data.word} name={data.name} />
            <div className="ftp-mast-notes">
              {data.notes.map((note, i) => (
                <MastNote key={note + i} divider={i > 0}>
                  {note}
                </MastNote>
              ))}
            </div>
          </div>
        </header>

        <SiteNav active={active} dark={theme === 'dark'} onToggleTheme={toggleTheme} />

        <main className="ftp-wrap ftp-sheets">
          <Cover onOpenCategory={openCategory} />
          {chapters.length > 0 && <Contents />}
          <About />
          {projects.length > 0 && (
            <Work filter={filter} onFilterChange={setFilter} onOpenProject={openProject} />
          )}
          {steps.length > 0 && <Process />}
          {words.length > 0 && <Words />}
          <Contact onCopyEmail={copyEmail} />
          <SiteFooter active={active} clock={clock} />
        </main>

        {project && openIndex != null && (
          <ProjectModal
            project={project}
            index={openIndex}
            category={categories.find((c) => c.id === project.category)}
            colors={colors}
            onClose={closeProject}
            onStep={stepProject}
          />
        )}
        {toast && (
          <div key={toast.id} className="ftp-toast" role="status">
            {toast.text}
          </div>
        )}
      </div>
    </PortfolioContext.Provider>
  )
}

function MastheadTab({ word, name }: { word: string; name: string }) {
  return (
    <div className="ftp-mast-tab">
      <StrokeText
        text={word}
        weight={17}
        tracking={20}
        color="#ffffff"
        label={`${word}, ${name}`}
      />
      <span className="ftp-reg" aria-hidden="true">
        ®
      </span>
    </div>
  )
}

function MastNote({ divider, children }: { divider: boolean; children: ReactNode }) {
  return (
    <Fragment>
      {divider && <i aria-hidden="true" />}
      <span>{children}</span>
    </Fragment>
  )
}
