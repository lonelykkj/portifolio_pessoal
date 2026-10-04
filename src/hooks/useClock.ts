import { useEffect, useState } from 'react'

export interface Clock {
  time: string
  day: boolean
}

/** Hora local de um fuso horário, atualizada a cada 30 segundos. */
export function useClock(timeZone: string) {
  const [clock, setClock] = useState<Clock | null>(null)

  useEffect(() => {
    const tick = () => {
      try {
        const now = new Date()
        const time = new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone,
        }).format(now)
        const hour = Number(
          new Intl.DateTimeFormat('en-GB', {
            hour: 'numeric',
            hourCycle: 'h23',
            timeZone,
          }).format(now),
        )
        setClock({ time, day: hour >= 7 && hour < 19 })
      } catch {
        setClock(null)
      }
    }
    tick()
    const id = setInterval(tick, 3e4)
    return () => clearInterval(id)
  }, [timeZone])

  return clock
}
