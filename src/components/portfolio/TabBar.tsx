import { useRef, type KeyboardEvent } from 'react'
import { pad2 } from '@/lib/stroke'
import type { Tone } from '@/types/portfolio'

export interface TabItem {
  id: string
  label: string
  tone: Tone
  count?: number
}

interface TabBarProps {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  label: string
  idBase: string
}

export function TabBar({ items, active, onChange, label, idBase }: TabBarProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next = -1
    if (event.key === 'ArrowRight') next = (index + 1) % items.length
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    if (next < 0) return
    event.preventDefault()
    onChange(items[next].id)
    buttons.current[next]?.focus()
  }

  return (
    <div className="ftp-tabbar" role="tablist" aria-label={label}>
      {items.map((item, index) => {
        const on = item.id === active
        return (
          <button
            key={item.id}
            ref={(el) => {
              buttons.current[index] = el
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${item.id}`}
            aria-selected={on}
            aria-controls={`${idBase}-panel`}
            tabIndex={on ? 0 : -1}
            className="ftp-tabshape ftp-tabbtn"
            data-tone={on ? item.tone : 'ghost'}
            data-on={on ? 'true' : 'false'}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
          >
            {item.label}
            {item.count != null && (
              <span className="ftp-tchip">{pad2(item.count)}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
