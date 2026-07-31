import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function ExperienceNode({ item, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative flex gap-8 pb-12 last:pb-0">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/5 overflow-hidden">
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full bg-grad-premium opacity-50"
          />
        </div>
      )}

      {/* Node Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className="relative z-10 w-8 h-8 rounded-full bg-space-black border border-cyan/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.2)]"
      >
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card p-6 rounded-2xl flex-1"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <div className="text-cyan text-sm font-mono uppercase tracking-widest font-semibold">{item.org}</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-muted">
            <Calendar size={12} />
            {item.period}
          </div>
        </div>
        <p className="text-muted leading-relaxed mb-6">
          {item.desc}
        </p>
        
        {/* Achievements Tags (Simulated from desc or static) */}
        <div className="flex flex-wrap gap-2">
          {['Scalability', 'Performance', 'UI/UX', 'Architecture'].map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-cyan/5 border border-cyan/10 text-cyan/70 rounded">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const { tx } = useLanguage()
  const e = tx.experience
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="badge-work mb-6">{e.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
            Professional <span className="text-gradient">Timeline</span>.
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            A chronological journey of technical leadership, architectural decisions, and continuous engineering evolution.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {e.cards.map((item, i) => (
            <ExperienceNode
              key={i}
              item={item}
              index={i}
              isLast={i === e.cards.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
