import { Github, Linkedin, Heart } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const FOOTER_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
]

export default function Footer() {
  const { tx } = useLanguage()
  const f = tx.footer
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        position: 'relative',
        padding: 'clamp(3rem, 6vw, 5rem) 1.25rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: '#050508',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(168,85,247,0.3), transparent)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span
                className="font-display"
                style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}
              >
                CM<span className="text-gradient-cyan">Coder</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 240 }}>
              {f.tagline}
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
              {[
                { href: 'https://github.com/bahodrivich77/', icon: <Github size={15} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/', icon: <Linkedin size={15} />, label: 'LinkedIn' },
                {
                  href: 'https://t.me/bahod1rovi_ch77',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  ),
                  label: 'Telegram',
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 32, height: 32, borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.68)', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
                    e.currentTarget.style.color = '#00d4ff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.68)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {f.pages}
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {FOOTER_LINKS.map(({ key, href }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    fontSize: '0.85rem', color: 'rgba(255,255,255,0.68)',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.68)'}
                >
                  {tx.nav[key]}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {f.contact}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="https://t.me/bahod1rovi_ch77" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.68)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#229ED9'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.68)'}
              >
                @bahod1rovi_ch77
              </a>
              <a href="https://github.com/bahodrivich77/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.68)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e6edf3'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.68)'}
              >
                github.com/bahodrivich77
              </a>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)' }}>
                Tashkent, Uzbekistan
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            © {year} Mirkarim Bahodirovich. {f.rights}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            {f.built}{' '}
            <Heart size={11} style={{ color: '#f43f5e', fill: '#f43f5e' }} />{' '}
            {f.with} React + Vite
          </span>
        </div>
      </div>
    </footer>
  )
}
