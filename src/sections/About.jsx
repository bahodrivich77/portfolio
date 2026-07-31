import { useRef, useEffect, useState } from 'react'
import { m as motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { Briefcase, Award, Zap, Code, Target } from 'lucide-react'

function AnimatedCounter({ value, duration = 2 }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (inView) {
      let start = 0
      const end = parseInt(value)
      if (isNaN(end)) return
      const totalFrames = duration * 60
      let frame = 0
      
      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        setDisplayValue(Math.floor(end * progress))
        if (frame === totalFrames) clearInterval(counter)
      }, 1000 / 60)
      
      return () => clearInterval(counter)
    }
  }, [inView, value, duration])

  return <span ref={ref}>{displayValue}</span>
}

function StatCard({ icon: Icon, value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group"
    >
      <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
        <Icon className="text-cyan" size={24} />
      </div>
      <div className="text-3xl font-display font-black text-white mb-1">
        <AnimatedCounter value={value} />+
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-muted">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { tx } = useLanguage()
  const a = tx.about
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { icon: Briefcase, value: '2', label: 'Years Experience' },
    { icon: Code, value: '10', label: 'Projects Completed' },
    { icon: Zap, value: '15', label: 'Technologies' },
    { icon: Award, value: '5', label: 'Achievements' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-work mb-6">{a.eyebrow}</div>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-8 leading-tight">
              Designing the <span className="text-gradient">Future</span> of Web.
            </h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed font-medium">
              <p>
                {a.bio1.replace('{highlight}', a.highlight).replace('{name}', tx.common.name)}
              </p>
              <p>
                {a.bio2}
              </p>
            </div>

            {/* Signature / Role */}
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan/20">
                <img src="/Cmcoder.webp" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{tx.common.name}</div>
                <div className="text-cyan font-mono text-sm uppercase tracking-widest">{a.role}</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats & Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} index={i} />
            ))}
            
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-card col-span-2 p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan rounded-full" />
                Professional Mission
              </h3>
              <p className="text-muted leading-relaxed">
                To bridge the gap between complex engineering requirements and intuitive user experiences, delivering scalable solutions that define industry standards.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
