import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, Eye } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const PROJECT_META = [
  {
    github: 'https://github.com/bahodrivich77/toys-store',
    live: null,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    badgeKey: 'featured',
    stars: 3,
  },
  {
    github: 'https://github.com/bahodrivich77/food-storee',
    live: null,
    tags: ['JavaScript', 'Vite', 'Tailwind CSS', 'CSS'],
    badgeKey: 'new',
    stars: 2,
  },
  {
    github: 'https://github.com/bahodrivich77/portfolio',
    live: null,
    tags: ['React', 'Framer Motion', 'Tailwind v4', 'Vite 7'],
    badgeKey: 'openSource',
    stars: 5,
  },
]

export default function Projects() {
  const { tx } = useLanguage()
  const p = tx.projects
  const [selected, setSelected] = useState(null)

  const projects = PROJECT_META.map((meta, i) => ({
    id: i + 1,
    ...meta,
    ...p.items[i],
    badge: p.badges[meta.badgeKey],
  }))

  return (
    <section id="projects" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={p.eyebrow}
          title={<span className="gradient-text">{p.title}</span>}
          subtitle={p.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelected(proj)}
              className="group glass p-6 cursor-pointer glow-border transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)]">
                  {proj.badge}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={13} fill="currentColor" />
                  <span className="text-xs text-[var(--text-muted)]">{proj.stars}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--linkedin-blue)] transition-colors">
                {proj.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{proj.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--linkedin-blue)] transition-colors"
                >
                  <Github size={15} /> {tx.common.github}
                </a>
                {proj.live ? (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[var(--linkedin-blue)]"
                  >
                    <ExternalLink size={15} /> {tx.common.liveDemo}
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                    <Eye size={15} /> {p.comingSoon}
                  </span>
                )}
              </div>

              <span className="block mt-4 text-xs text-[var(--text-muted)] group-hover:text-[var(--linkedin-blue)] transition-colors">
                {p.detail} →
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm"
              style={{ background: 'var(--overlay)' }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 80, opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg glass p-7 relative"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-muted)]"
                >
                  ✕
                </button>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)] mb-4 inline-block">
                  {selected.badge}
                </span>
                <h3 className="text-2xl font-bold mb-3">{selected.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-5">{selected.longDesc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-sm rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 btn-outline rounded-xl text-center text-sm flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> {tx.common.github}
                  </a>
                  {selected.live && (
                    <a
                      href={selected.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 btn-primary rounded-xl text-center text-sm flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> {tx.common.liveDemo}
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/bahodrivich77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 btn-outline rounded-full"
          >
            <Github size={18} /> {p.allProjects}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
