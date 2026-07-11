import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Trophy } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const CARD_META = [
  { type: 'edu',         icon: GraduationCap, tags: ['React', 'JavaScript', 'Tailwind'],      color: '#00d4ff' },
  { type: 'work',        icon: Briefcase,     tags: ['React', 'Next.js', 'Freelance'],        color: '#10b981' },
  { type: 'achievement', icon: Trophy,        tags: ['Portfolio', 'React', 'Design'],         color: '#f59e0b' },
  { type: 'edu',         icon: GraduationCap, tags: ['Next.js', 'TypeScript', 'API'],         color: '#a855f7' },
  { type: 'work',        icon: Briefcase,     tags: ['GitHub', 'Open Source', 'Community'],   color: '#6366f1' },
]

function StatCounter({ value, label, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '1.5rem 1rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div className="font-display text-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: 6, letterSpacing: '0.04em' }}>
        {label}
      </div>
    </motion.div>
  )
}

function ExperienceCard({ card, index, total, inView }) {
  const isLeft = index % 2 === 0
  const isLast = index === total - 1
  const accent = card.color

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2rem 1fr',
      alignItems: 'start',
      gap: '0 1rem',
    }}>
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingBottom: isLast ? 0 : '2rem', gridColumn: isLeft ? 1 : 3 }}
      >
        {isLeft && (
          <div
            className="glass-hover"
            style={{
              padding: '1.25rem',
              borderRadius: '1rem',
              border: `1px solid ${accent}20`,
              background: `radial-gradient(ellipse at 0% 0%, ${accent}05, rgba(255,255,255,0.015))`,
            }}
          >
            <CardContent card={card} accent={accent} />
          </div>
        )}
      </motion.div>

      {/* Center timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent}, ${accent}80)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${accent}30`,
            zIndex: 1, flexShrink: 0,
          }}
        >
          <card.icon size={14} color="#fff" />
        </motion.div>
        {!isLast && (
          <div style={{
            width: 1, flex: 1, minHeight: 40,
            background: `linear-gradient(to bottom, ${accent}30, rgba(168,85,247,0.1))`,
            marginTop: 4,
          }} />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 30 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingBottom: isLast ? 0 : '2rem', gridColumn: !isLeft ? 3 : 1 }}
      >
        {!isLeft && (
          <div
            className="glass-hover"
            style={{
              padding: '1.25rem',
              borderRadius: '1rem',
              border: `1px solid ${accent}20`,
              background: `radial-gradient(ellipse at 100% 0%, ${accent}05, rgba(255,255,255,0.015))`,
            }}
          >
            <CardContent card={card} accent={accent} />
          </div>
        )}
      </motion.div>
    </div>
  )
}

function CardContent({ card, accent }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
          {card.period}
        </span>
        <span style={{
          width: 24, height: 24, borderRadius: '0.4rem',
          background: `${accent}12`, border: `1px solid ${accent}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <card.icon size={11} style={{ color: accent }} />
        </span>
      </div>
      <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem', marginBottom: 2, lineHeight: 1.3 }}>
        {card.title}
      </h3>
      <div style={{ color: accent, fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        {card.org}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        {card.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {card.tags.map((t) => (
          <span key={t} style={{
            padding: '0.15rem 0.5rem', borderRadius: 9999,
            fontSize: '0.62rem', fontWeight: 600,
            background: `${accent}08`, border: `1px solid ${accent}15`,
            color: `${accent}cc`,
          }}>
            {t}
          </span>
        ))}
      </div>
    </>
  )
}

// Mobile card (simplified single column)
function MobileCard({ card, index, inView }) {
  const accent = card.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ display: 'flex', gap: '1rem' }}
    >
      {/* Timeline track */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, ${accent}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 12px ${accent}25`, flexShrink: 0,
        }}>
          <card.icon size={14} color="#fff" />
        </div>
        {index < CARD_META.length - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 20, background: `${accent}20`, marginTop: 4 }} />
        )}
      </div>

      <div
        className="glass-hover"
        style={{
          flex: 1,
          padding: '1rem',
          borderRadius: '1rem',
          border: `1px solid ${accent}15`,
          background: 'rgba(255,255,255,0.02)',
          marginBottom: index < CARD_META.length - 1 ? '0.75rem' : 0,
        }}
      >
        <CardContent card={card} accent={accent} />
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { tx } = useLanguage()
  const e = tx.experience
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const cards = CARD_META.map((meta, i) => ({
    ...meta,
    ...e.cards[i],
  }))

  const stats = [
    { value: '2+', label: e.stats.experience },
    { value: '10+', label: e.stats.projects },
    { value: '5+', label: e.stats.tech },
    { value: '∞', label: e.stats.motivation },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        background: 'rgba(8,11,18,0.6)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="eyebrow-pill" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            {e.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            <span className="text-gradient">{e.title}</span>
          </h2>
        </motion.div>

        {/* Timeline — desktop alternating */}
        <div className="hidden md:block" style={{ marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
          {cards.map((card, i) => (
            <ExperienceCard key={i} card={card} index={i} total={cards.length} inView={inView} />
          ))}
        </div>

        {/* Timeline — mobile single column */}
        <div className="md:hidden" style={{ marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
          {cards.map((card, i) => (
            <MobileCard key={i} card={card} index={i} inView={inView} />
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          {stats.map(({ value, label }, i) => (
            <StatCounter key={label} value={value} label={label} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
