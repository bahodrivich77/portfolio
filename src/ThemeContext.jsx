import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem(STORAGE_KEY, theme)

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', isDark ? '#1b1f23' : '#f4f6f9')
  }, [theme, isDark])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
