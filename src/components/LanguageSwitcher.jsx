import { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
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

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.5rem 0.75rem', borderRadius: '0.6rem',
          border: '1px solid rgba(255,255,255,0.08)',
          background: open ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.04)',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.78rem', fontWeight: 700,
          cursor: 'pointer', transition: 'all 0.2s',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
          e.currentTarget.style.color = '#00d4ff'
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }
        }}
      >
        <Globe size={13} style={{ color: '#00d4ff' }} />
        {current?.label}
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)',
          minWidth: 150, borderRadius: '0.75rem',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#0d1117',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.08)',
          overflow: 'hidden', zIndex: 60,
        }}>
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { setLang(l.code); setOpen(false) }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '0.75rem', padding: '0.65rem 1rem',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                background: lang === l.code ? 'rgba(0,212,255,0.06)' : 'transparent',
                color: lang === l.code ? '#00d4ff' : 'rgba(255,255,255,0.45)',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (lang !== l.code) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== l.code) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                }
              }}
            >
              <span>
                <span style={{ fontWeight: 800 }}>{l.label}</span>
                <span style={{ marginLeft: '0.4rem', opacity: 0.5, fontSize: '0.72rem' }}>{l.name}</span>
              </span>
              {lang === l.code && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
