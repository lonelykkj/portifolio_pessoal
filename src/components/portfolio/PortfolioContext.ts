import { createContext, useContext, type RefCallback } from 'react'
import type { PortfolioData, SheetId } from '@/types/portfolio'

export interface SheetDef {
  id: SheetId
  label: string
  page: string
}

export const SHEETS: SheetDef[] = [
  { id: 'cover', label: 'Capa', page: 'Capa' },
  { id: 'contents', label: 'Índice', page: 'Índice' },
  { id: 'about', label: 'Sobre', page: 'Sobre mim' },
  { id: 'work', label: 'Projetos', page: 'Projetos' },
  { id: 'process', label: 'Processo', page: 'Processo' },
  { id: 'words', label: 'Elogios', page: 'Avaliações' },
  { id: 'contact', label: 'Contato', page: 'Contato' },
]

export interface PortfolioContextValue {
  uid: string
  data: PortfolioData
  /** Páginas visíveis, na ordem em que aparecem. */
  sheets: SheetDef[]
  firstName: string
  signature: string
  scrollTo: (id: SheetId) => void
  pageNumber: (id: SheetId) => number
  sheetProps: (id: SheetId) => {
    id: string
    'data-sheet': SheetId
    ref: RefCallback<HTMLElement>
    'aria-labelledby': string
  }
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio deve ser usado dentro de <Portfolio>')
  return ctx
}
