import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { tx } = useLanguage()
  const h = tx.hero
  const [typedText, setTypedText] = useState('')

  const typeTexts = useMemo(() => h.typeSequence || [], [h.typeSequence])

  useEffect(() => {
    let active = true
    let currentIndex = 0
    let currentChar = 0
    let timer

    const typeLoop = () => {
      if (!active) return

      const currentText = typeTexts[currentIndex] || ''
      if (currentChar <= currentText.length) {
        setTypedText(currentText.slice(0, currentChar))
        currentChar += 1
        timer = window.setTimeout(typeLoop, 80)
      } else {
        timer = window.setTimeout(() => {
          currentChar = 0
          currentIndex = (currentIndex + 1) % typeTexts.length
          typeLoop()
        }, 2800)
      }
    }

    typeLoop()
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [typeTexts])

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const bioParts = h.bio.split(/(\{[^}]+\})/)
  const bioHighlights = {
    beautiful: h.beautiful,
    fast: h.fast,
    comfortable: h.comfortable,
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-5 overflow-hidden"
    >
      <div className="hero-official-panel flex flex-col items-center text-center max-w-4xl w-full dark:!bg-transparent dark:!border-0 dark:!shadow-none dark:!p-0">
        <div className="relative mb-10 animate-float">
          <div className="absolute -inset-1 rounded-full bg-[var(--linkedin-blue)] opacity-20 blur-sm" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[var(--card-bg)] shadow-lg ring-4 ring-[var(--gov-blue)]/25 dark:ring-[var(--linkedin-blue)]/30">
            <picture>
              <source
                srcSet="/Cmcoder-sm.webp 320w, /Cmcoder.webp 640w"
                sizes="(max-width: 640px) 144px, 176px"
                type="image/webp"
              />
              <img
                src="/Cmcoder.webp"
                alt={tx.common.name}
                width="176"
                height="176"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--card-bg)] pulse-glow" />
        </div>

        <span className="official-eyebrow mb-6 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
          {h.badge}
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight text-[var(--text-primary)]">
          {tx.common.name.split(' ')[0]}{' '}
          <span className="gradient-text">{tx.common.name.split(' ').slice(1).join(' ')}</span>
        </h1>

        <div className="h-10 mb-6 flex items-center justify-center">
          <span className="text-xl sm:text-2xl text-[var(--text-secondary)] font-medium">
            {typedText}
            <span className="animate-cursor" aria-hidden="true" />
          </span>
        </div>

        <p className="text-[var(--text-secondary)] max-w-xl text-base sm:text-lg leading-relaxed mb-10">
          {bioParts.map((part, i) => {
            const key = part.replace(/[{}]/g, '')
            if (bioHighlights[key]) {
              return (
                <span key={i} className="text-[var(--linkedin-blue)] font-semibold">
                  {bioHighlights[key]}
                </span>
              )
            }
            return <span key={i}>{part}</span>
          })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 btn-primary text-base transition-transform duration-200 hover:-translate-y-0.5"
          >
            {h.ctaProjects}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 btn-outline text-base transition-transform duration-200 hover:-translate-y-0.5"
          >
            {h.ctaContact}
          </button>
        </div>

        <div className="flex gap-4 mt-8">
          {[
            {
              href: 'https://github.com/bahodrivich77/',
              Icon: Github,
              hover: 'hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]',
              label: 'GitHub',
            },
            {
              href: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
              Icon: Linkedin,
              hover: 'hover:text-[var(--linkedin-blue)] hover:border-[var(--linkedin-blue)]',
              label: 'LinkedIn',
            },
            {
              href: 'https://t.me/bahod1rovi_ch77',
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              ),
              hover: 'hover:text-sky-600 hover:border-sky-400',
              label: 'Telegram',
            },
          ].map(({ href, Icon, hover, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`p-3 glass rounded-full text-[var(--text-muted)] transition-all duration-200 ${hover} hover:-translate-y-0.5`}
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-14 w-full max-w-sm sm:max-w-md">
          {[
            { value: '2+', label: h.stats.experience },
            { value: '10+', label: h.stats.projects },
            { value: '100%', label: h.stats.quality },
          ].map(({ value, label }) => (
            <div key={label} className="text-center glass stat-official py-4 px-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--gov-blue)] dark:text-[var(--linkedin-blue)]">
                {value}
              </div>
              <div className="text-[var(--text-muted)] text-xs sm:text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollDown}
        aria-label="Pastga scroll"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--linkedin-blue)] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">{h.scroll}</span>
        <span className="animate-bounce">
          <ArrowDown size={18} />
        </span>
      </button>
    </section>
  )
}
