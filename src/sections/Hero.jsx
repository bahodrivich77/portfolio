import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Github, Linkedin } from 'lucide-react'
import Cmcoder from '../assets/Cmcoder.jpg'
import { useLanguage } from '../i18n/LanguageContext'

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 2,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 6,
}))

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const { tx } = useLanguage()
  const h = tx.hero

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const typeSequence = h.typeSequence.flatMap((text) => [text, 2800])

  const bioParts = h.bio.split(/(\{[^}]+\})/)
  const bioHighlights = { beautiful: h.beautiful, fast: h.fast, comfortable: h.comfortable }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-5 overflow-hidden"
    >
      <div className="hidden dark:block">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--linkedin-blue)]/15 pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: -10 }}
          animate={{ y: [0, -window.innerHeight - 20], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="hero-official-panel flex flex-col items-center text-center max-w-4xl w-full dark:!bg-transparent dark:!border-0 dark:!shadow-none dark:!p-0"
      >
        <motion.div variants={fadeUp} className="relative mb-10 animate-float">
          <div className="absolute -inset-1 rounded-full bg-[var(--linkedin-blue)] opacity-20 blur-sm" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[var(--card-bg)] shadow-lg ring-4 ring-[var(--gov-blue)]/25 dark:ring-[var(--linkedin-blue)]/30">
            <img src={Cmcoder} alt={tx.common.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--card-bg)] pulse-glow" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <span className="official-eyebrow mb-6">
            <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
            {h.badge}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight text-[var(--text-primary)]"
        >
          {tx.common.name.split(' ')[0]}{' '}
          <span className="gradient-text">{tx.common.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="h-10 mb-6 flex items-center justify-center">
          <span className="text-xl sm:text-2xl text-[var(--text-secondary)] font-medium">
            <TypeAnimation
              sequence={typeSequence}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-xl text-base sm:text-lg leading-relaxed mb-10">
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
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 btn-primary text-base"
          >
            {h.ctaProjects}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 btn-outline text-base"
          >
            {h.ctaContact}
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-4 mt-8">
          {[
            { href: 'https://github.com/bahodrivich77/', Icon: Github, hover: 'hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]' },
            { href: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/', Icon: Linkedin, hover: 'hover:text-[var(--linkedin-blue)] hover:border-[var(--linkedin-blue)]' },
            {
              href: 'https://t.me/bahod1rovi_ch77',
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              ),
              hover: 'hover:text-sky-600 hover:border-sky-400',
            },
          ].map(({ href, Icon, hover }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 glass text-[var(--text-muted)] transition-all ${hover}`}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-14 w-full max-w-sm sm:max-w-md">
          {[
            { value: '2+', label: h.stats.experience },
            { value: '10+', label: h.stats.projects },
            { value: '100%', label: h.stats.quality },
          ].map(({ value, label }) => (
            <div key={label} className="text-center glass stat-official py-4 px-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--gov-blue)] dark:text-[var(--linkedin-blue)]">{value}</div>
              <div className="text-[var(--text-muted)] text-xs sm:text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--linkedin-blue)] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">{h.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
