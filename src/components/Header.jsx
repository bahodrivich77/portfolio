import { useState, useEffect } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Men haqimda', href: '#about' },
  { label: "Ko'nikmalar", href: '#skills' },
  { label: 'Tajriba', href: '#experience' },
  { label: 'Loyihalar', href: '#projects' },
  { label: 'Aloqa', href: '#contact' },
]

export default function Header({ activeSection, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          paddingTop: scrolled ? '1rem' : '2rem',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <nav
          className="glass flex items-center justify-between gap-8 px-6 py-3 rounded-2xl w-full max-w-5xl mx-4"
          style={{
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {/* Logo / Monogram */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/gemini-svg.svg.svg" alt="Mirkarim Logo" className="w-6 h-6 object-contain relative z-10" />
              <div className="absolute inset-0 bg-grad-premium opacity-20" />
              <div className="absolute inset-0 border border-cyan-dim opacity-40 rounded-lg" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white/90 group-hover:text-cyan transition-colors">
              Mirkarim <span className="text-muted">Bahodirovich</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors"
                style={{
                  color: isActive(item.href) ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-premium !py-2 !px-4 !text-xs !rounded-xl"
            >
              Bog'lanish
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden glass flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.href)}
                className="text-2xl font-display font-bold text-white/80 hover:text-cyan transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
