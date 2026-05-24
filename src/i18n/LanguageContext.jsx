import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, LANGUAGES } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && translations[saved] ? saved : 'uz'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'uz' ? 'uz' : lang
  }, [lang])

  const t = useCallback(
    (path) => {
      const keys = path.split('.')
      let value = translations[lang]
      for (const key of keys) {
        value = value?.[key]
      }
      return value ?? path
    },
    [lang]
  )

  const tx = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tx, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
