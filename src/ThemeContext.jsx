import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext(null)

/* eslint-disable react-refresh/only-export-components */

// Portfolio is always dark — ThemeProvider kept for compatibility
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('portfolio-theme', 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', '#0B1120')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', isDark: true, setTheme: () => {}, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
