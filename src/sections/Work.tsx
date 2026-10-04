import { Folder } from '@/components/portfolio/Folder'
import { ProjectArt } from '@/components/portfolio/ProjectArt'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { TabBar, type TabItem } from '@/components/portfolio/TabBar'
import type { CSSVars } from '@/components/portfolio/cssVars'
import { hashString, pad2, projectMark } from '@/lib/stroke'

interface WorkProps {
  filter: string
  onFilterChange: (id: string) => void
  onOpenProject: (index: number) => void
}

export function Work({ filter, onFilterChange, onOpenProject }: WorkProps) {
  const { uid, data, sheetProps } = usePortfolio()
  const { projects, categories, colors } = data
  const category = (id: string) => categories.find((c) => c.id === id)
  const count = (id: string) => projects.filter((p) => p.category === id).length

  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === 'all' || project.category === filter)

  const tabs: TabItem[] = [
    { id: 'all', label: 'Todos', tone: 'blue', count: projects.length },
    ...categories
      .filter((c) => count(c.id) > 0)
      .map((c) => ({ id: c.id, label: c.label, tone: c.tone, count: count(c.id) })),
  ]
  const barTone = filter === 'all' ? 'blue' : (category(filter)?.tone ?? 'blue')

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('work')}>
      <SheetMeta id="work" />
      <SheetHeading
        id="work"
        tag={`(${pad2(projects.length)})`}
        word="Projetos"
        kicker="Filtre o arquivo por pasta. Abra qualquer arquivo para ver os detalhes; use as setas do teclado para navegar."
      />
      <div className="ftp-filter">
        <TabBar
          items={tabs}
          active={filter}
          onChange={onFilterChange}
          label="Filtrar projetos por categoria"
          idBase={`${uid}-wf`}
        />
        <div className="ftp-bar" style={{ '--c': colors[barTone] } as CSSVars} />
      </div>
      <div
        className="ftp-grid"
        key={filter}
        role="tabpanel"
        id={`${uid}-wf-panel`}
        aria-labelledby={`${uid}-wf-tab-${filter}`}
      >
        {visible.map(({ project, index }, position) => {
          const cat = category(project.category)
          const tabAt = (position * 0.37) % 1 > 0.85 ? 0.85 : (position * 0.37) % 1
          return (
            <Folder
              key={project.title + index}
              as="button"
              tone={cat?.tone ?? 'blue'}
              tabAt={tabAt}
              className="ftp-card"
              style={{ '--i': position }}
              tab={
                <>
                  {cat?.label ?? project.category}
                  <span className="ftp-tchip">{pad2(index + 1)}</span>
                </>
              }
              onClick={() => onOpenProject(index)}
              aria-haspopup="dialog"
              aria-label={`${project.title}, ${project.year}. Abrir detalhes`}
            >
              <span className="ftp-card-art" style={{ display: 'block' }}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    width={320}
                    height={220}
                    style={{ maxWidth: 'none' }}
                  />
                ) : (
                  <ProjectArt
                    kind={cat?.kind ?? 'poster'}
                    seed={hashString(project.title)}
                    mark={projectMark(project)}
                    colors={colors}
                  />
                )}
              </span>
              <span className="ftp-card-cap">
                <span>
                  <span className="ftp-card-t" style={{ display: 'block' }}>
                    {project.title}
                  </span>
                  {project.local && (
                    <span className="ftp-card-l" style={{ display: 'block' }}>
                      {project.local}
                    </span>
                  )}
                </span>
                <span className="ftp-card-y">{project.year}</span>
              </span>
            </Folder>
          )
        })}
        {!visible.length && (
          <p className="ftp-empty">Esta pasta está vazia por enquanto.</p>
        )}
      </div>
    </section>
  )
}
