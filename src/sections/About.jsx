import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { MapPin, Calendar, Coffee, Heart, Rocket, Star } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const FACT_ICONS = [
  { key: 'location',   icon: MapPin,    color: '#00d4ff' },
  { key: 'experience', icon: Calendar,  color: '#a855f7' },
  { key: 'energy',     icon: Coffee,    color: '#f59e0b' },
  { key: 'stack',      icon: Heart,     color: '#f43f5e' },
  { key: 'goal',       icon: Rocket,    color: '#10b981' },
  { key: 'hobby',      icon: Star,      color: '#f59e0b' },
]

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #00d4ff, transparent)' }} />
      <span style={{
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#00d4ff',
      }}>{text}</span>
    </div>
  )
}

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
      style={{ paddingBottom: isLast ? 0 : '1.75rem' }}
    >
      {/* Timeline track */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: index % 2 === 0
            ? 'linear-gradient(135deg, #00d4ff, #3b82f6)'
            : 'linear-gradient(135deg, #a855f7, #6366f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 800, color: '#fff',
          boxShadow: index % 2 === 0
            ? '0 0 12px rgba(0,212,255,0.3)'
            : '0 0 12px rgba(168,85,247,0.3)',
          position: 'relative', zIndex: 1,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {item.year.slice(2)}
        </div>
        {!isLast && (
          <div style={{
            width: 1, flex: 1, minHeight: 20,
            background: 'linear-gradient(to bottom, rgba(0,212,255,0.2), rgba(168,85,247,0.1))',
            marginTop: 4,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingTop: 6 }}>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
          {item.year}
        </span>
        <h3 style={{ fontWeight: 700, color: '#fff', marginTop: 2, marginBottom: 4, fontSize: '0.95rem' }}>
          {item.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const { tx } = useLanguage()
  const a = tx.about
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const facts = FACT_ICONS.map(({ key, icon: Icon, color }) => ({
    Icon, color,
    label: a.facts[key].label,
    value: a.facts[key].value,
  }))

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '20%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="eyebrow-pill" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            {a.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            {a.title.split(' ')[0]}{' '}
            <span className="text-gradient">{a.title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'start' }}>
          {/* LEFT — Photo + facts */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Photo card */}
            <div
              className="glass-hover"
              style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
              }}
            >
              {/* Gradient overlay top */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(5,5,8,0.9) 100%)',
                pointerEvents: 'none',
              }} />
              <picture>
                <source srcSet="/Cmcoder-sm.webp 320w, /Cmcoder.webp 640w" sizes="(max-width: 640px) 100vw, 50vw" type="image/webp" />
                <img
                  src="/Cmcoder.webp"
                  alt={tx.common.name}
                  width="640"
                  height="640"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </picture>
              {/* Name badge */}
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', zIndex: 2 }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{tx.common.name}</div>
                <div style={{ color: '#00d4ff', fontSize: '0.8rem', marginTop: 2 }}>{a.role}</div>
              </div>
              {/* Holo badge top right */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem', zIndex: 2,
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
                fontSize: '0.65rem', fontWeight: 700, color: '#00d4ff',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                Frontend Dev
              </div>
            </div>

            {/* Facts grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {facts.map(({ Icon, color, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass-hover"
                  style={{
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '0.5rem',
                    background: `${color}12`, border: `1px solid ${color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.04em' }}>{label}</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', marginTop: 2 }}>{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Bio + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Bio card */}
            <div
              className="glass-hover"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <SectionLabel text={a.whoAmI} />
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
                {a.bio1.split('{highlight}')[0]}
                <span style={{ color: '#00d4ff', fontWeight: 600 }}>{a.highlight}</span>
                {a.bio1.split('{highlight}')[1]?.replace('{name}', tx.common.name)}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                {a.bio2}
              </p>

              {/* Tech stack quick view */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Vite'].map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            {/* Timeline card */}
            <div
              className="glass-hover"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <SectionLabel text={a.journey} />
              <div style={{ paddingTop: '0.5rem' }}>
                {a.timeline.map((item, i) => (
                  <TimelineItem
                    key={item.year}
                    item={item}
                    index={i}
                    isLast={i === a.timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
