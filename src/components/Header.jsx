import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_KEYS = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingTop: scrolled ? '0.75rem' : '1.25rem', paddingBottom: scrolled ? '0.75rem' : '1.25rem', transition: 'padding 0.4s ease' }}
      >
        {/* Floating nav container */}
        <div className="max-w-6xl mx-auto px-5">
          <div
            className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl transition-all duration-500"
            style={{
              background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
              border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
              boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(168,85,247,0.2))', border: '1px solid rgba(0,212,255,0.3)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 4.5L9 2L16 4.5V9C16 13 9 16 9 16C9 16 2 13 2 9V4.5Z" stroke="url(#logo-grad)" strokeWidth="1.5" fill="none"/>
                    <path d="M6 9L8 11L12 7" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="logo-grad" x1="2" y1="2" x2="16" y2="16">
                        <stop stopColor="#00d4ff"/>
                        <stop offset="1" stopColor="#a855f7"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="text-base font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                CM<span className="text-gradient-cyan">Coder</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300"
                  style={{
                    color: isActive(item.href) ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                    background: isActive(item.href) ? 'rgba(0,212,255,0.08)' : 'transparent',
                  }}
                >
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                {tx.nav.cta}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="h-20" />
            {/* Decorative line */}
            <div className="neon-line mx-8" />
            <nav className="flex flex-col items-stretch justify-center flex-1 gap-2 px-8 py-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(item.href)}
                  className="py-4 px-6 rounded-xl text-left text-lg font-semibold transition-all duration-200"
                  style={{
                    background: isActive(item.href) ? 'rgba(0,212,255,0.06)' : 'transparent',
                    border: isActive(item.href) ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
                    color: isActive(item.href) ? '#00d4ff' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  <span className="code-text text-xs mr-3" style={{ color: 'rgba(0,212,255,0.4)' }}>
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.06 + 0.1 }}
                onClick={() => scrollTo('#contact')}
                className="mt-4 w-full py-4 btn-primary rounded-xl text-lg font-semibold text-center"
              >
                {tx.nav.cta}
              </motion.button>
            </nav>

            <div className="pb-10 text-center code-text" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>
              CMCoder © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
