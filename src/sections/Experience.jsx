import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const CARD_TYPES = [
  { type: 'edu', icon: <GraduationCap size={20} />, tags: ['React', 'JavaScript', 'Tailwind'] },
  { type: 'work', icon: <Briefcase size={20} />, tags: ['React', 'Next.js', 'Freelance'] },
  { type: 'achievement', icon: <Trophy size={20} />, tags: ['Portfolio', 'React', 'Design'] },
  { type: 'edu', icon: <GraduationCap size={20} />, tags: ['Next.js', 'TypeScript', 'API'] },
  { type: 'work', icon: <Briefcase size={20} />, tags: ['GitHub', 'Open Source', 'Community'] },
]

export default function Experience() {
  const { tx } = useLanguage()
  const e = tx.experience
  const scrollRef = useRef(null)

  const cards = CARD_TYPES.map((meta, i) => ({
    ...meta,
    ...e.cards[i],
  }))

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section id="experience" className="py-28 overflow-hidden bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          eyebrow={e.eyebrow}
          title={<span className="gradient-text">{e.title}</span>}
        />

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 glass rounded-full items-center justify-center hover:border-[var(--linkedin-blue)]/40 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 glass rounded-full items-center justify-center hover:border-[var(--linkedin-blue)]/40 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10 pointer-events-none lg:hidden" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex-shrink-0 w-72 sm:w-80 glass p-6 snap-start glow-border"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--linkedin-blue)] flex items-center justify-center text-white mb-4 shadow-md">
                  {card.icon}
                </div>
                <span className="text-[var(--text-muted)] text-xs font-medium">{card.period}</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1 mb-0.5">{card.title}</h3>
                <div className="text-[var(--linkedin-blue)] text-sm font-medium mb-3">{card.org}</div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{card.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-4 lg:hidden">
            <span className="text-[var(--text-muted)] text-xs">{e.scrollHint}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-14"
        >
          {[
            { value: '2+', label: e.stats.experience },
            { value: '10+', label: e.stats.projects },
            { value: '5+', label: e.stats.tech },
            { value: '∞', label: e.stats.motivation },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-xl p-5 text-center glow-border">
              <div className="text-3xl font-extrabold text-[var(--linkedin-blue)]">{value}</div>
              <div className="text-[var(--text-muted)] text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
