import { useState, useRef } from 'react'
import { m as motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, X, Layers, Zap, Target } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const PROJECT_META = [
  {
    github: 'https://github.com/bahodrivich77/toys-store',
    live: null,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    badgeKey: 'featured',
    accent: '#00d4ff',
    emoji: '🛒',
    category: 'E-Commerce',
  },
  {
    github: 'https://github.com/bahodrivich77/food-storee',
    live: null,
    tags: ['JavaScript', 'Vite', 'Tailwind CSS', 'CSS'],
    badgeKey: 'new',
    accent: '#f59e0b',
    emoji: '🍕',
    category: 'Restaurant',
  },
  {
    github: 'https://github.com/bahodrivich77/portfolio',
    live: 'https://mirkarim-dev.vercel.app',
    tags: ['React', 'Framer Motion', 'Tailwind v4', 'Vite 7'],
    badgeKey: 'openSource',
    accent: '#a855f7',
    emoji: '⚡',
    category: 'Portfolio',
  },
]

function BrowserMockup({ accent, emoji, category }) {
  return (
    <div
      style={{
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: `1px solid ${accent}20`,
        background: '#0d1117',
        marginBottom: '1.5rem',
        userSelect: 'none',
      }}
    >
      {/* Browser chrome */}
      <div style={{
        padding: '0.6rem 0.75rem',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: `1px solid ${accent}15`,
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 16, borderRadius: 9999,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em', fontFamily: 'JetBrains Mono, monospace' }}>
            mirkarim-dev.vercel.app
          </span>
        </div>
      </div>

      {/* "Screen" */}
      <div style={{
        padding: '1.5rem',
        minHeight: 120,
        background: `radial-gradient(ellipse at 50% 0%, ${accent}08 0%, transparent 70%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{emoji}</span>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: `${accent}`,
          opacity: 0.7,
        }}>
          {category}
        </span>
        {/* Fake UI skeleton lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '70%', marginTop: 4 }}>
          {[80, 60, 40].map((w, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 9999, opacity: 0.12,
              background: accent, width: `${w}%`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: '1.25rem',
        border: `1px solid ${hovered ? project.accent + '30' : 'rgba(255,255,255,0.06)'}`,
        background: hovered
          ? `radial-gradient(ellipse at 50% 0%, ${project.accent}06, rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 0 40px ${project.accent}08` : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Browser mockup */}
      <BrowserMockup accent={project.accent} emoji={project.emoji} category={project.category} />

      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: 9999,
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
          background: `${project.accent}12`, border: `1px solid ${project.accent}25`,
          color: project.accent, textTransform: 'uppercase',
        }}>
          {project.badge}
        </span>
        <span style={{
          fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.1rem', fontWeight: 800,
        marginBottom: '0.5rem', letterSpacing: '-0.01em',
        transition: 'color 0.2s',
        color: hovered ? project.accent : '#fff',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem',
        lineHeight: 1.65, marginBottom: '1rem', flex: 1,
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {project.tags.map((t) => (
          <span key={t} className="tech-badge" style={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <Github size={14} /> Code
        </a>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: project.accent, textDecoration: 'none' }}
          >
            <ExternalLink size={14} /> Live
          </a>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>Coming soon</span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: hovered ? project.accent : 'rgba(255,255,255,0.2)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 4 }}>
          Details <ArrowUpRight size={12} />
        </span>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5,5,8,0.9)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          borderRadius: '1.5rem',
          background: '#0d1117',
          border: `1px solid ${project.accent}25`,
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          position: 'relative',
          boxShadow: `0 0 60px ${project.accent}10`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          <X size={14} />
        </button>

        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: 9999,
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
          background: `${project.accent}12`, border: `1px solid ${project.accent}25`,
          color: project.accent, textTransform: 'uppercase',
          display: 'inline-block', marginBottom: '1rem',
        }}>
          {project.badge}
        </span>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff', letterSpacing: '-0.02em' }}>
          {project.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {project.longDesc}
        </p>

        {/* Problem / Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { icon: <Target size={14} />, label: 'Challenge', text: project.challenge, color: '#f43f5e' },
            { icon: <Zap size={14} />,    label: 'Solution',  text: project.solution,  color: '#10b981' },
          ].map(({ icon, label, text, color }) => (
            <div key={label} style={{
              padding: '1rem', borderRadius: '0.75rem',
              background: `${color}06`, border: `1px solid ${color}15`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color, marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {icon} {label}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginRight: '0.25rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
            <Layers size={12} />
          </div>
          {project.tags.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ flex: 1, padding: '0.85rem', borderRadius: '0.75rem', textAlign: 'center', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <Github size={15} /> Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, padding: '0.85rem', borderRadius: '0.75rem', textAlign: 'center', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <ExternalLink size={15} /> Live demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { tx } = useLanguage()
  const p = tx.projects
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  const projects = PROJECT_META.map((meta, i) => ({
    ...meta,
    ...p.items[i],
    badge: p.badges[meta.badgeKey],
  }))

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="eyebrow-pill" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            {p.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            <span className="text-gradient">{p.title}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '36rem', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {p.subtitle}
          </p>
        </motion.div>

        {/* Project grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {projects.map((proj, i) => (
            <ProjectCard
              key={proj.title}
              project={proj}
              index={i}
              inView={inView}
              onClick={() => setSelected(proj)}
            />
          ))}
        </div>

        {/* All projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="https://github.com/bahodrivich77"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem' }}
          >
            <Github size={17} /> {p.allProjects}
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
