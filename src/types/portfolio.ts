export type Tone = 'blue' | 'green' | 'orange' | 'yellow'

export type ArtKind = 'brand' | 'render' | 'sale' | 'page' | 'poster'

export type Palette = Record<Tone, string>

export interface Category {
  id: string
  label: string
  tone: Tone
  kind: ArtKind
  local?: string
}

export interface Project {
  title: string
  category: string
  year: string
  summary: string
  local?: string
  client?: string
  role?: string
  tools?: string[]
  mark?: string
  body?: string[]
  image?: string
  href?: string
}

interface Highlight {
  label: string
  tone?: Tone
  lines: string[]
}

interface TimelineEntry {
  from: string
  to: string
  title: string
  place?: string
}

interface Chapter {
  title: string
  target: SheetId
  local?: string
  points?: string[]
}

interface Step {
  title: string
  body: string
  local?: string
  duration?: string
  outputs?: string[]
}

interface Testimonial {
  quote: string
  name: string
  role: string
  tone?: Tone
}

interface Contact {
  label: string
  value: string
  href?: string
}

export type SheetId =
  | 'cover'
  | 'contents'
  | 'about'
  | 'work'
  | 'process'
  | 'words'
  | 'contact'

export interface PortfolioData {
  name: string
  years: string
  role: string
  disciplines: string[]
  word: string
  tag: string
  subtitle: string[]
  notes: string[]
  blurb: string
  greeting: string
  email: string
  timeZone: string
  colors: Palette
  categories: Category[]
  projects: Project[]
  highlights: Highlight[]
  timeline: TimelineEntry[]
  chapters: Chapter[]
  steps: Step[]
  words: Testimonial[]
  contacts: Contact[]
  localName?: string
  signature?: string
  timeZoneLabel?: string
  photo?: string
}
