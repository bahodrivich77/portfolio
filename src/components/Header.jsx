import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const NAV_KEYS = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
]

export default function Header({ activeSection, scrolled }) {
  const { tx } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_ITEMS = NAV_KEYS.map(({ key, href }) => ({
    label: tx.nav[key],
    href,
  }))

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href) => activeSection === href.replace('#', '')

  return (
    <>
      <header
        className={`header-official fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'header-official-scrolled py-3 bg-[var(--card-bg)]/95 backdrop-blur-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2 group shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--gov-blue)] flex items-center justify-center shadow-sm">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--linkedin-blue)]">CM Coder</span>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-[var(--linkedin-blue)] bg-[var(--linkedin-blue)]/10 border border-[var(--linkedin-blue)]/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--linkedin-blue)]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary px-5 py-2.5 rounded-full text-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              {tx.nav.cta}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] transition-transform duration-200 hover:-translate-y-0.5"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-page)]/98 backdrop-blur-xl lg:hidden flex flex-col transition-opacity duration-200">
          <div className="h-20" />
          <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`w-full py-3.5 px-6 rounded-xl text-lg font-semibold text-left transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)] border border-[var(--linkedin-blue)]/25'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => scrollTo('#contact')}
              className="mt-4 w-full py-4 btn-primary rounded-xl text-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              {tx.nav.cta}
            </button>
          </nav>

          <div className="pb-10 text-center text-[var(--text-muted)] text-sm">
            CM Coder © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </>
  )
}
