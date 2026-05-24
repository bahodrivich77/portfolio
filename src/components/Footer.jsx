import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Code2, Heart } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const SOCIALS = [
  {
    href: 'https://t.me/bahod1rovi_ch77',
    label: 'Telegram',
    hover: 'hover:text-sky-600 hover:border-sky-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/bahod1rovi_ch77',
    label: 'Instagram',
    hover: 'hover:text-pink-600 hover:border-pink-400',
    icon: <Instagram size={16} />,
  },
  {
    href: 'https://github.com/bahodrivich77',
    label: 'GitHub',
    hover: 'hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]',
    icon: <Github size={16} />,
  },
  {
    href: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
    label: 'LinkedIn',
    hover: 'hover:text-[var(--linkedin-blue)] hover:border-[var(--linkedin-blue)]',
    icon: <Linkedin size={16} />,
  },
]

const NAV_KEYS = ['about', 'skills', 'projects', 'experience', 'blog', 'contact']
const NAV_IDS = ['about', 'skills', 'projects', 'experience', 'blog', 'contact']

export default function Footer() {
  const { tx } = useLanguage()
  const f = tx.footer
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-8 border-t border-[var(--border)] overflow-hidden bg-[var(--card-bg)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent dark:via-[var(--linkedin-blue)] dark:h-0.5" />

      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--linkedin-blue)] flex items-center justify-center">
                <Code2 size={17} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[var(--linkedin-blue)]">CM Coder</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{f.tagline}</p>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-4 text-sm">{f.pages}</h4>
            <ul className="space-y-2">
              {NAV_KEYS.map((key, i) => (
                <li key={key}>
                  <button
                    onClick={() => document.getElementById(NAV_IDS[i])?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[var(--text-secondary)] hover:text-[var(--linkedin-blue)] text-sm transition-colors"
                  >
                    {tx.nav[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-4 text-sm">{f.contact}</h4>
            <p className="text-[var(--text-secondary)] text-sm mb-1">{tx.common.name}</p>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{tx.about.role}</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ href, label, icon, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 glass rounded-lg text-[var(--text-muted)] transition-all ${hover}`}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--text-muted)] text-xs">
            © {year} {tx.common.name}. {f.rights}
          </p>
          <p className="text-[var(--text-muted)] text-xs flex items-center gap-1.5">
            {f.built}{' '}
            <Heart size={11} className="text-[var(--linkedin-blue)] fill-[var(--linkedin-blue)]" />
            {' '}{f.with} React + Tailwind + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
