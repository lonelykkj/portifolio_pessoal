import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { CSSVars } from './cssVars'

type FolderTone = 'blue' | 'green' | 'orange' | 'yellow' | 'sheet'

interface FolderProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  tone: FolderTone
  tab?: ReactNode
  /** Posição horizontal da aba, de 0 (colada à esquerda) a 1 (à direita). */
  tabAt?: number
  glass?: boolean
  as?: ElementType
  bodyClass?: string
  style?: CSSVars
  'aria-haspopup'?: 'dialog'
  'aria-modal'?: boolean
}

/** Pasta de arquivo com uma aba recortada. */
export function Folder({
  tone,
  tab,
  tabAt = 0.1,
  glass,
  as: Tag = 'div',
  className,
  bodyClass,
  style,
  children,
  ...rest
}: FolderProps) {
  const flush = tabAt <= 0 ? 'left' : tabAt >= 1 ? 'right' : undefined

  return (
    <Tag
      {...rest}
      className={'ftp-folder' + (className ? ' ' + className : '')}
      data-tone={tone}
      data-glass={glass ? 'true' : undefined}
      data-flush={flush}
      style={{ ...style, '--tx': Math.min(1, Math.max(0, tabAt)) }}
    >
      {tab != null && (
        <span
          className="ftp-tabshape ftp-ftab"
          data-tone={tone}
          data-flush={flush}
        >
          {tab}
        </span>
      )}
      <div className={'ftp-fbody' + (bodyClass ? ' ' + bodyClass : '')}>
        {children}
      </div>
    </Tag>
  )
}
