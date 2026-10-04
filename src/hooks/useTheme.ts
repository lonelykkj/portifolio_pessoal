import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme(initial: Theme) {
  const [theme, setTheme] = useState<Theme>(initial)

  const toggle = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return [theme, toggle] as const
}
