import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Briefcase, ShieldAlert, Award, FileSpreadsheet, Lock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const CARD_META = [
  { type: 'security',    icon: Lock,            tags: ['Cryptography', 'GOST', 'C++'],            color: '#047857' },
  { type: 'gov-projects',icon: FileSpreadsheet, tags: ['Architecture', 'G2G Integration', 'Go'], color: '#D97706' },
  { type: 'team-lead',   icon: Briefcase,       tags: ['GovCloud', 'Identity Core', 'gRPC'],      color: '#047857' },
  { type: 'tech-lead',   icon: Award,           tags: ['Sovereign Digital', 'Standardization'],  color: '#D97706' },
  { type: 'audit',       icon: ShieldAlert,     tags: ['Critical Infrastructure', 'Pentesting'], color: '#047857' },
]

function StatCounter({ value, label, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.35 + index * 0.08, duration: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '1.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid #334155',
        background: 'rgba(15, 23, 42, 0.6)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <div className="font-display text-[#fbbf24]" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
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
      gridTemplateColumns: '1fr 2.5rem 1fr',
      alignItems: 'start',
      gap: '0 1rem',
    }}>
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingBottom: isLast ? 0 : '2rem', gridColumn: isLeft ? 1 : 3 }}
      >
        {isLeft && (
          <div
            className="glass-hover"
            style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: `1px solid ${accent}40`,
              background: `radial-gradient(ellipse at 0% 0%, ${accent}08, rgba(15, 23, 42, 0.7))`,
            }}
          >
            <CardContent card={card} accent={accent} />
          </div>
        )}
      </motion.div>

      {/* Center timeline point with state crest design */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 32, height: 32, borderRadius: '0.25rem',
            background: `linear-gradient(135deg, ${accent}, ${accent}90)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${accent}40`,
            zIndex: 1, flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <card.icon size={13} color="#fff" />
        </motion.div>
        {!isLast && (
          <div style={{
            width: 1.5, flex: 1, minHeight: 40,
            background: `linear-gradient(to bottom, ${accent}40, rgba(51, 65, 85, 0.2))`,
            marginTop: 4,
          }} />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 30 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingBottom: isLast ? 0 : '2rem', gridColumn: !isLeft ? 3 : 1 }}
      >
        {!isLeft && (
          <div
            className="glass-hover"
            style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: `1px solid ${accent}40`,
              background: `radial-gradient(ellipse at 100% 0%, ${accent}08, rgba(15, 23, 42, 0.7))`,
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
      <div style={{ display: 'flex', alignItems: 'center', justifySpace: 'space-between', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.65rem', color: '#fbbf24', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em', fontWeight: 700 }}>
          {card.period}
        </span>
        <span style={{
          width: 24, height: 24, borderRadius: '0.25rem',
          background: `${accent}20`, border: `1px solid ${accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <card.icon size={11} style={{ color: accent === '#047857' ? '#34d399' : '#fbbf24' }} />
        </span>
      </div>
      <h3 style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem', marginBottom: 2, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
        {card.title}
      </h3>
      <div style={{ color: accent === '#047857' ? '#34d399' : '#fbbf24', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
        {card.org}
      </div>
      <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        {card.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {card.tags.map((t) => (
          <span key={t} style={{
            padding: '0.15rem 0.5rem', borderRadius: '0.25rem',
            fontSize: '0.62rem', fontWeight: 600,
            background: 'rgba(15,23,42,0.6)', border: '1px solid #334155',
            color: '#94a3b8',
          }}>
            {t}
          </span>
        ))}
      </div>
    </>
  )
}

function MobileCard({ card, index, inView }) {
  const accent = card.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      style={{ display: 'flex', gap: '1rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '0.25rem',
          background: `linear-gradient(135deg, ${accent}, ${accent}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 12px ${accent}30`, flexShrink: 0,
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <card.icon size={13} color="#fff" />
        </div>
        {index < CARD_META.length - 1 && (
          <div style={{ width: 1.5, flex: 1, minHeight: 20, background: `${accent}30`, marginTop: 4 }} />
        )}
      </div>

      <div
        className="glass-hover"
        style={{
          flex: 1,
          padding: '1.1rem',
          borderRadius: '0.75rem',
          border: `1px solid ${accent}30`,
          background: 'rgba(15, 23, 42, 0.75)',
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
    { value: '08+', label: e.stats.experience },
    { value: '15+', label: e.stats.projects },
    { value: '25+', label: e.stats.tech },
    { value: 'Class-A', label: e.stats.motivation },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        background: 'rgba(15,23,42,0.4)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 70%)',
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
