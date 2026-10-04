import { useEffect, useRef } from 'react'
import { hashString, pad2, projectMark } from '@/lib/stroke'
import type { Category, Palette, Project } from '@/types/portfolio'
import { Arrow } from './icons'
import { Folder } from './Folder'
import { ProjectArt } from './ProjectArt'
import { usePortfolio } from './PortfolioContext'

interface ProjectModalProps {
  project: Project
  index: number
  category?: Category
  colors: Palette
  onClose: () => void
  onStep: (delta: number) => void
}

/** Janela com os detalhes de um projeto. */
export function ProjectModal({
  project,
  index,
  category,
  colors,
  onClose,
  onStep,
}: ProjectModalProps) {
  const { uid } = usePortfolio()
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') onStep(1)
      else if (event.key === 'ArrowLeft') onStep(-1)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  return (
    <div
      className="ftp-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Folder
        tone={category?.tone ?? 'blue'}
        tabAt={0.04}
        className="ftp-modal"
        role="dialog"
        aria-modal={true}
        aria-labelledby={`${uid}-dlg-t`}
        tab={
          <>
            {category?.label ?? project.category}
            <span className="ftp-tchip">{pad2(index + 1)}</span>
          </>
        }
      >
        <button
          type="button"
          ref={closeButton}
          className="ftp-close"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          Fechar ✕
        </button>
        <div className="ftp-modal-grid" key={index}>
          <div className="ftp-modal-art">
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
                kind={category?.kind ?? 'poster'}
                seed={hashString(project.title)}
                mark={projectMark(project)}
                colors={colors}
              />
            )}
          </div>
          <div
            className="ftp-modal-info"
            style={{ animation: 'ftp-in .5s cubic-bezier(.2,.8,.2,1) both' }}
          >
            <div>
              <h3 className="ftp-modal-t" id={`${uid}-dlg-t`}>
                {project.title}
              </h3>
              {project.local && <p className="ftp-modal-l">{project.local}</p>}
            </div>
            <p className="ftp-modal-p">{project.summary}</p>
            {project.body?.map((paragraph, i) => (
              <p key={i} className="ftp-modal-p">
                {paragraph}
              </p>
            ))}
            <dl className="ftp-dl2">
              <dt>Ano</dt>
              <dd>{project.year}</dd>
              {project.client && (
                <>
                  <dt>Cliente</dt>
                  <dd>{project.client}</dd>
                </>
              )}
              {project.role && (
                <>
                  <dt>Função</dt>
                  <dd>{project.role}</dd>
                </>
              )}
              {project.tools && project.tools.length > 0 && (
                <>
                  <dt>Ferramentas</dt>
                  <dd>{project.tools.join(' · ')}</dd>
                </>
              )}
            </dl>
            <div className="ftp-modal-nav">
              <div className="ftp-btns">
                <button
                  type="button"
                  className="ftp-btn"
                  data-ghost="true"
                  onClick={() => onStep(-1)}
                  aria-label="Projeto anterior"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  className="ftp-btn"
                  data-ghost="true"
                  onClick={() => onStep(1)}
                  aria-label="Próximo projeto"
                >
                  <Arrow />
                </button>
              </div>
              {project.href && (
                <a
                  className="ftp-btn"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar <Arrow dir="ne" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Folder>
    </div>
  )
}
