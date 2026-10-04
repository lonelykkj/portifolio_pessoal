import { useEffect, type RefObject } from 'react'

/** Revela elementos `.ftp-rv` quando entram na tela. */
export function useReveal(root: RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    const targets = Array.from(el.querySelectorAll<HTMLElement>('.ftp-rv'))
    if (typeof IntersectionObserver !== 'function') {
      targets.forEach((t) => (t.dataset.in = 'true'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.in = 'true'
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
