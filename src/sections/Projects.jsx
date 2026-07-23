import { useState, useRef } from 'react'
import { m as motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, X, Layers, Zap, Target } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const PROJECT_META = [
  {
    github: 'https://github.com/bahodrivich77/',
    live: null,
    tags: ['Go (Golang)', 'gRPC', 'Redis', 'HSM Cryptography'],
    badgeKey: 'featured',
    accent: '#34d399',
    emoji: '🛡️',
    category: 'Security Core',
  },
  {
    github: 'https://github.com/bahodrivich77/',
    live: null,
    tags: ['Kubernetes', 'Docker / OCI', 'mTLS Mesh', 'GitOps'],
    badgeKey: 'new',
    accent: '#fbbf24',
    emoji: '☁️',
    category: 'GovCloud Infra',
  },
  {
    github: 'https://github.com/bahodrivich77/',
    live: null,
    tags: ['Go', 'Apache Kafka', 'PostgreSQL Cluster', 'GOST Crypto'],
    badgeKey: 'openSource',
    accent: '#34d399',
    emoji: '🏦',
    category: 'State Finance',
  },
]

function BrowserMockup({ accent, emoji, category }) {
  return (
    <div
      style={{
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: `1px solid ${accent}30`,
        background: '#0B1120',
        marginBottom: '1.5rem',
        userSelect: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Browser chrome */}
      <div style={{
        padding: '0.6rem 0.75rem',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: `1px solid ${accent}20`,
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 16, borderRadius: 4,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '0.5rem', color: '#94a3b8', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            SECURE_TUNNEL::GOV_GATEWAY
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
          fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: `${accent}`,
          opacity: 0.9,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {category}
        </span>
        {/* Fake tactical UI lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '70%', marginTop: 6 }}>
          {[80, 60, 45].map((w, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 1, opacity: 0.15,
              background: accent, width: `${w}%`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, inView, onClick }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    const maxTilt = 8
    setTilt({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        borderRadius: '0.75rem',
        border: `1px solid ${hovered ? project.accent + '50' : '#334155'}`,
        background: hovered
          ? `radial-gradient(ellipse at 50% 0%, ${project.accent}10, rgba(15, 23, 42, 0.85))`
          : 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(20px)',
        padding: '1.5rem',
        cursor: 'pointer',
        boxShadow: hovered ? `0 15px 45px ${project.accent}15, 0 0 25px ${project.accent}05` : 'none',
        display: 'flex',
        flexDirection: 'column',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${hovered ? 1.015 : 1})`,
        transition: hovered ? 'transform 0.05s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
        <BrowserMockup accent={project.accent} emoji={project.emoji} category={project.category} />
      </div>

      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', transform: 'translateZ(10px)' }}>
        <span style={{
          padding: '0.2rem 0.6rem',
          borderRadius: '0.25rem',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          background: `${project.accent}12`,
          border: `1px solid ${project.accent}30`,
          color: project.accent,
          textTransform: 'uppercase',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {project.badge}
        </span>
        <span style={{
          fontSize: '0.65rem',
          color: '#64748b',
          fontFamily: 'JetBrains Mono, monospace',
          marginLeft: 'auto',
          fontWeight: 700,
        }}>
          SYS_{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 800,
        marginBottom: '0.5rem',
        letterSpacing: '-0.01em',
        transition: 'color 0.2s',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.95)',
        transform: 'translateZ(15px)',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        color: '#94a3b8',
        fontSize: '0.85rem',
        lineHeight: 1.65,
        marginBottom: '1rem',
        flex: 1,
        transform: 'translateZ(10px)',
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem', transform: 'translateZ(10px)' }}>
        {project.tags.map((t) => (
          <span key={t} className="tech-badge" style={{ color: '#94a3b8', borderColor: '#334155', background: 'rgba(15,23,42,0.6)' }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', transform: 'translateZ(15px)' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'JetBrains Mono, monospace' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
        >
          <Github size={14} /> REPO
        </a>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: project.accent, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}
          >
            <ExternalLink size={14} /> PORTAL
          </a>
        ) : (
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>[CLASSIFIED]</span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: hovered ? '#fbbf24' : '#64748b', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
          BRIEF <ArrowUpRight size={12} />
        </span>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  const { tx } = useLanguage()
  const p = tx.projects
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
        background: 'rgba(11,17,32,0.95)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          borderRadius: '1rem',
          background: '#0B1120',
          border: `2px solid ${project.accent}30`,
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          position: 'relative',
          boxShadow: `0 0 60px ${project.accent}15`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: 32, height: 32, borderRadius: '0.25rem',
            background: 'rgba(255,255,255,0.03)', border: '1px solid #334155',
            color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#94a3b8' }}
        >
          <X size={14} />
        </button>

        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: '0.25rem',
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
          background: `${project.accent}12`, border: `1px solid ${project.accent}30`,
          color: project.accent, textTransform: 'uppercase',
          display: 'inline-block', marginBottom: '1rem',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {project.badge}
        </span>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff', letterSpacing: '-0.02em' }}>
          {project.title}
        </h3>
        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {project.longDesc}
        </p>

        {/* Problem / Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { icon: <Target size={14} />, label: p.challengeLabel, text: project.challenge, color: '#ef4444' },
            { icon: <Zap size={14} />,    label: p.solutionLabel,  text: project.solution,  color: '#10b981' },
          ].map(({ icon, label, text, color }) => (
            <div key={label} style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: `${color}06`, border: `1px solid ${color}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color, marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
                {icon} {label}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginRight: '0.25rem', color: '#64748b', fontSize: '0.7rem' }}>
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
            style={{ flex: 1, padding: '0.85rem', borderRadius: '0.375rem', textAlign: 'center', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}
          >
            <Github size={15} /> ACCESS REPO
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, padding: '0.85rem', borderRadius: '0.375rem', textAlign: 'center', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <ExternalLink size={15} /> SECURE PORTAL
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
        background: 'radial-gradient(circle, rgba(4,120,87,0.04) 0%, transparent 70%)',
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
          <p style={{ color: '#94a3b8', maxWidth: '36rem', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
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

        {/* All projects archive link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="https://github.com/bahodrivich77"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.25rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}
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
