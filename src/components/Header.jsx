import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`header-official fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'header-official-scrolled py-3 bg-[var(--card-bg)]/95 backdrop-blur-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--gov-blue)] flex items-center justify-center shadow-sm">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--linkedin-blue)]">CM Coder</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-[var(--linkedin-blue)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--linkedin-blue)]'
                }`}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--linkedin-blue)]/10 border border-[var(--linkedin-blue)]/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contact')}
              className="btn-primary px-5 py-2.5 rounded-full text-sm"
            >
              {tx.nav.cta}
            </motion.button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)]"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-page)]/98 backdrop-blur-xl lg:hidden flex flex-col"
          >
            <div className="h-20" />

            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center flex-1 gap-2 px-8"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full py-3.5 px-6 rounded-xl text-lg font-semibold text-left transition-all ${
                    isActive(item.href)
                      ? 'bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)] border border-[var(--linkedin-blue)]/25'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => scrollTo('#contact')}
                className="mt-4 w-full py-4 btn-primary rounded-xl text-lg"
              >
                {tx.nav.cta}
              </motion.button>
            </motion.nav>

            <div className="pb-10 text-center text-[var(--text-muted)] text-sm">
              CM Coder © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
