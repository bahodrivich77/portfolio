import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const TECH_NODES = [
  // Core — center cluster
  { name: 'React',       level: 90, category: 'framework', color: '#61dafb', size: 'lg' },
  { name: 'TypeScript',  level: 72, category: 'language',  color: '#3178c6', size: 'md' },
  { name: 'JavaScript',  level: 88, category: 'language',  color: '#f7df1e', size: 'md' },
  { name: 'Next.js',     level: 78, category: 'framework', color: '#ffffff', size: 'md' },
  { name: 'Tailwind',    level: 92, category: 'framework', color: '#06b6d4', size: 'md' },
  // Tools
  { name: 'Git',         level: 85, category: 'tool',      color: '#f05032', size: 'sm' },
  { name: 'Figma',       level: 70, category: 'design',    color: '#f24e1e', size: 'sm' },
  { name: 'Vite',        level: 88, category: 'tool',      color: '#646cff', size: 'sm' },
  { name: 'GitHub',      level: 85, category: 'tool',      color: '#e6edf3', size: 'sm' },
  // Frontend
  { name: 'HTML5',       level: 95, category: 'language',  color: '#e34f26', size: 'sm' },
  { name: 'CSS3',        level: 90, category: 'language',  color: '#1572b6', size: 'sm' },
  { name: 'Framer M.',   level: 82, category: 'framework', color: '#bb4fff', size: 'sm' },
  // Emerging
  { name: 'Node.js',     level: 45, category: 'backend',   color: '#339933', size: 'xs' },
  { name: 'REST API',    level: 80, category: 'other',     color: '#00d4ff', size: 'xs' },
  { name: 'VS Code',     level: 95, category: 'tool',      color: '#007acc', size: 'xs' },
]

const MARQUEE_TECHS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Framer Motion', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Vite', 'Figma',
  'REST API', 'Node.js', 'VS Code', 'Vercel', 'React Router',
]

const SIZE_MAP = { lg: 72, md: 56, sm: 44, xs: 36 }

// Positions around a center point — manually tuned for visual balance
const NODE_POSITIONS = [
  { x: 50,  y: 50  }, // React — center
  { x: 65,  y: 28  }, // TypeScript
  { x: 35,  y: 28  }, // JavaScript
  { x: 72,  y: 50  }, // Next.js
  { x: 28,  y: 50  }, // Tailwind
  { x: 68,  y: 72  }, // Git
  { x: 40,  y: 75  }, // Figma
  { x: 55,  y: 78  }, // Vite
  { x: 20,  y: 35  }, // GitHub
  { x: 80,  y: 35  }, // HTML5
  { x: 82,  y: 65  }, // CSS3
  { x: 18,  y: 65  }, // Framer
  { x: 50,  y: 18  }, // Node.js
  { x: 15,  y: 50  }, // REST API
  { x: 85,  y: 50  }, // VS Code
]

function TechNode({ node, pos, index, inView }) {
  const sz = SIZE_MAP[node.size] || 44
  const isHighlighted = node.level >= 85

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.15, zIndex: 20 }}
      style={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: index,
        cursor: 'default',
      }}
      className={node.size === 'lg' || node.size === 'md' ? 'animate-float' : ''}
    >
      <div
        style={{
          width: sz,
          height: sz,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle, ${node.color}14 0%, ${node.color}06 70%)`,
          border: `1px solid ${node.color}${isHighlighted ? '40' : '20'}`,
          backdropFilter: 'blur(8px)',
          boxShadow: isHighlighted ? `0 0 20px ${node.color}20, 0 0 40px ${node.color}08` : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <span style={{
          fontSize: node.size === 'lg' ? '0.65rem' : '0.55rem',
          fontWeight: 700,
          color: node.color,
          textAlign: 'center',
          lineHeight: 1.2,
          padding: '0 4px',
          opacity: 0.9,
        }}>
          {node.name}
        </span>
      </div>
    </motion.div>
  )
}

function UniverseCanvas({ inView }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '65%', minHeight: 320 }}>
      {/* Connection lines SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Connect React center to all neighbors */}
        {[1,2,3,4,12,5,8].map((toIdx) => (
          <line
            key={toIdx}
            x1={`${NODE_POSITIONS[0].x}%`}
            y1={`${NODE_POSITIONS[0].y}%`}
            x2={`${NODE_POSITIONS[toIdx].x}%`}
            y2={`${NODE_POSITIONS[toIdx].y}%`}
            stroke="rgba(0,212,255,0.06)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        ))}
        {/* A few cross connections */}
        {[[1,9],[2,8],[3,10],[4,11],[5,6],[6,7]].map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={`${NODE_POSITIONS[a].x}%`}
            y1={`${NODE_POSITIONS[a].y}%`}
            x2={`${NODE_POSITIONS[b].x}%`}
            y2={`${NODE_POSITIONS[b].y}%`}
            stroke="rgba(168,85,247,0.05)"
            strokeWidth="0.6"
            strokeDasharray="3 6"
          />
        ))}
      </svg>

      {/* Nodes */}
      {TECH_NODES.map((node, i) => (
        <TechNode
          key={node.name}
          node={node}
          pos={NODE_POSITIONS[i] || { x: 50, y: 50 }}
          index={i}
          inView={inView}
        />
      ))}

      {/* Center pulse */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 120, height: 120,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

function SkillCard({ category, skills, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-hover"
      style={{
        padding: '1.5rem',
        borderRadius: '1.25rem',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '0.6rem',
          background: `${category.color}12`, border: `1px solid ${category.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          {category.emoji}
        </div>
        <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{category.label}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {skills.map(({ name, level, color }) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 500 }}>{name}</span>
              <span style={{ color: color || '#00d4ff', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                {level}%
              </span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 + index * 0.1 }}
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  background: color
                    ? `linear-gradient(90deg, ${color}, ${color}aa)`
                    : 'linear-gradient(90deg, #00d4ff, #a855f7)',
                  boxShadow: `0 0 8px ${color || '#00d4ff'}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    emoji: '⌨️',
    color: '#f7df1e',
    skills: [
      { name: 'JavaScript', level: 88, color: '#f7df1e' },
      { name: 'TypeScript', level: 72, color: '#3178c6' },
      { name: 'HTML5',      level: 95, color: '#e34f26' },
      { name: 'CSS3',       level: 90, color: '#1572b6' },
    ],
  },
  {
    label: 'Frameworks',
    emoji: '⚛️',
    color: '#61dafb',
    skills: [
      { name: 'React',          level: 90, color: '#61dafb' },
      { name: 'Next.js',        level: 78, color: '#e6edf3' },
      { name: 'Tailwind CSS',   level: 92, color: '#06b6d4' },
      { name: 'Framer Motion',  level: 82, color: '#bb4fff' },
    ],
  },
  {
    label: 'Tools',
    emoji: '🔧',
    color: '#f05032',
    skills: [
      { name: 'Git / GitHub',  level: 85, color: '#f05032' },
      { name: 'Vite',          level: 88, color: '#646cff' },
      { name: 'Figma',         level: 70, color: '#f24e1e' },
      { name: 'VS Code',       level: 95, color: '#007acc' },
    ],
  },
  {
    label: 'Other',
    emoji: '🌐',
    color: '#00d4ff',
    skills: [
      { name: 'Responsive Design', level: 93, color: '#00d4ff' },
      { name: 'REST APIs',          level: 80, color: '#10b981' },
      { name: 'UI/UX Thinking',     level: 75, color: '#a855f7' },
      { name: 'Clean Code',         level: 82, color: '#6366f1' },
    ],
  },
]

export default function Skills() {
  const { tx } = useLanguage()
  const s = tx.skills
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const doubled = [...MARQUEE_TECHS, ...MARQUEE_TECHS]

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        overflow: 'hidden',
        background: 'rgba(8, 11, 18, 0.6)',
        position: 'relative',
      }}
    >
      {/* Atmospheric left glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '-10%',
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
            {s.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            <span className="text-gradient">{s.title}</span>
          </h2>
        </motion.div>

        {/* Marquee */}
        <div style={{ position: 'relative', marginBottom: 'clamp(3rem, 6vw, 5rem)', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(90deg, #080b12, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(270deg, #080b12, transparent)', zIndex: 10, pointerEvents: 'none',
          }} />
          <div className="marquee-track">
            {doubled.map((tech, i) => (
              <div
                key={i}
                className="glass-hover"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  margin: '0 0.5rem', padding: '0.6rem 1.25rem',
                  borderRadius: '0.75rem', whiteSpace: 'nowrap',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: '0.8rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', opacity: 0.6, flexShrink: 0 }} />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Universe visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.015)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              Technology Universe
            </span>
          </div>
          <UniverseCanvas inView={inView} />
        </motion.div>

        {/* Skill cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <SkillCard
              key={cat.label}
              category={cat}
              skills={cat.skills}
              index={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
