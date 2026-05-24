import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ variant = 'desktop' }) {
  const { lang, setLang, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = languages.find((l) => l.code === lang)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const select = (code) => {
    setLang(code)
    setOpen(false)
  }

  const isMobile = variant === 'mobile'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Tilni tanlash"
        aria-expanded={open}
        className={
          isMobile
            ? 'flex items-center gap-2 w-full py-4 px-6 rounded-2xl text-lg font-semibold glass border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--linkedin-blue)] hover:border-[var(--linkedin-blue)]/30 transition-all'
            : 'flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:border-[var(--linkedin-blue)]/40 hover:text-[var(--linkedin-blue)] transition-all shadow-sm'
        }
      >
        <Globe size={isMobile ? 20 : 16} className="text-[var(--linkedin-blue)] shrink-0" />
        <span>{current?.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={
              isMobile
                ? 'mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xl overflow-hidden'
                : 'absolute right-0 top-full mt-2 min-w-[140px] rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xl overflow-hidden z-[60]'
            }
          >
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => select(l.code)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  lang === l.code
                    ? 'bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                }`}
              >
                <span>
                  <span className="font-bold">{l.label}</span>
                  <span className="text-[var(--text-muted)] ml-2">{l.name}</span>
                </span>
                {lang === l.code && <Check size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
