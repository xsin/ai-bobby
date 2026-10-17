import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ThemeChoice } from '@shared/api'

type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  choice: ThemeChoice
  resolved: ResolvedTheme
  setChoice: (choice: ThemeChoice) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'ai-bobby-theme'

function readChoice(): ThemeChoice {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') return value
  } catch {
    // ignore
  }
  return 'system'
}

function resolve(choice: ThemeChoice): ResolvedTheme {
  if (choice === 'light' || choice === 'dark') return choice
  if (typeof matchMedia !== 'function') return 'dark'
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(readChoice)
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolve(choice))

  useEffect(() => {
    const media = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : undefined
    const update = () => setResolved(resolve(choice))
    update()
    media?.addEventListener('change', update)
    return () => media?.removeEventListener('change', update)
  }, [choice])

  useEffect(() => {
    document.documentElement.dataset.theme = resolved
    document.documentElement.classList.add('ai-bobby-root')
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(() => ({ choice, resolved, setChoice }), [choice, resolved, setChoice])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeProvider')
  return value
}
