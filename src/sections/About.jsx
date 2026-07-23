import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Shield, Award, Cpu, Eye, Lock, Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const FACT_ICONS = [
  { key: 'location',   icon: Globe,     color: '#10b981' },
  { key: 'experience', icon: Award,     color: '#fbbf24' },
  { key: 'energy',     icon: Cpu,       color: '#10b981' },
  { key: 'stack',      icon: Shield,    color: '#fbbf24' },
  { key: 'goal',       icon: Lock,      color: '#10b981' },
  { key: 'hobby',      icon: Eye,       color: '#fbbf24' },
]

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div style={{ width: 32, height: 1.5, background: 'linear-gradient(90deg, #10b981, transparent)' }} />
      <span style={{
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#10b981', fontFamily: 'JetBrains Mono, monospace'
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
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
      style={{ paddingBottom: isLast ? 0 : '1.75rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '0.375rem',
          background: index % 2 === 0
            ? 'linear-gradient(135deg, #047857, #10b981)'
            : 'linear-gradient(135deg, #d97706, #fbbf24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 800, color: '#fff',
          boxShadow: index % 2 === 0
            ? '0 0 12px rgba(4,120,87,0.3)'
            : '0 0 12px rgba(217,119,6,0.3)',
          position: 'relative', zIndex: 1,
          fontFamily: 'JetBrains Mono, monospace',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          {item.year.split(' ').slice(-1)[0].slice(2)}
        </div>
        {!isLast && (
          <div style={{
            width: 1, flex: 1, minHeight: 20,
            background: 'linear-gradient(to bottom, rgba(4,120,87,0.25), rgba(217,119,6,0.15))',
            marginTop: 4,
          }} />
        )}
      </div>

      <div style={{ paddingTop: 6 }}>
        <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em', fontWeight: 700 }}>
          {item.year}
        </span>
        <h3 style={{ fontWeight: 700, color: '#fff', marginTop: 2, marginBottom: 4, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
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
      {/* Decorative emerald glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '20%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4,120,87,0.08) 0%, transparent 70%)',
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
            {/* Photo card styled as Government Badge */}
            <div
              className="glass-hover"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '2px solid #334155',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(11,17,32,0.95) 100%)',
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
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </picture>

              {/* Verified Hologram Overlay */}
              <div style={{
                position: 'absolute', top: '1rem', left: '1rem', zIndex: 2,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.75rem', borderRadius: '0.25rem',
                background: 'rgba(4,120,87,0.15)', border: '1px solid #10b981',
                fontSize: '0.55rem', fontWeight: 700, color: '#34d399',
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em',
              }}>
                <Shield size={10} className="animate-pulse" /> OFFICALLY VERIFIED
              </div>

              {/* Name badge */}
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', zIndex: 2 }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.01em' }}>{tx.common.name}</div>
                <div style={{ color: '#fbbf24', fontSize: '0.8rem', marginTop: 2, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{a.role}</div>
              </div>

              {/* Crypto Stamp */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem', zIndex: 2,
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                background: 'rgba(217,119,6,0.1)', border: '1px solid #D97706',
                fontSize: '0.6rem', fontWeight: 800, color: '#fbbf24',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                ACCESS LEVEL: 5
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
                    padding: '1.1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #334155',
                    background: 'rgba(15, 23, 42, 0.65)',
                    display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                    cursor: 'default',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '0.375rem',
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', marginTop: 3 }}>{value}</div>
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
                borderRadius: '1rem',
                border: '1px solid #334155',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <SectionLabel text={a.whoAmI} />
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                {a.bio1.split('{highlight}')[0]}
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>{a.highlight}</span>
                {a.bio1.split('{highlight}')[1]?.replace('{name}', tx.common.name)}
              </p>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.9rem' }}>
                {a.bio2}
              </p>

              {/* Core Gov Security technology stack badges */}
              <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Go', 'Rust', 'Kubernetes', 'DevSecOps', 'Cryptography', 'Linux', 'mTLS', 'OAuth 2.0'].map((tech) => (
                  <span key={tech} className="tech-badge" style={{ border: '1px solid #334155', background: 'rgba(4,120,87,0.06)' }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Timeline card */}
            <div
              className="glass-hover"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '1rem',
                border: '1px solid #334155',
                background: 'rgba(15, 23, 42, 0.75)',
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
