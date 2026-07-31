import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { Layout, Server, Wrench, Globe, Zap } from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    icon: Layout,
    color: '#00d4ff',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    label: 'Backend',
    icon: Server,
    color: '#a855f7',
    skills: [
      { name: 'Node.js / Express', level: 75 },
      { name: 'REST APIs', level: 85 },
      { name: 'MongoDB', level: 70 },
      { name: 'PostgreSQL', level: 65 },
    ],
  },
  {
    label: 'Tools & Devops',
    icon: Wrench,
    color: '#3b82f6',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 60 },
      { name: 'Vite / Webpack', level: 85 },
      { name: 'Vercel / Netlify', level: 90 },
    ],
  },
  {
    label: 'Architecture',
    icon: Globe,
    color: '#10b981',
    skills: [
      { name: 'System Design', level: 75 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'SEO Optimization', level: 85 },
      { name: 'Performance', level: 90 },
    ],
  },
]

function SkillProgress({ name, level, color }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold text-white/80">{name}</span>
        <span className="text-xs font-mono text-muted">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ category, index }) {
  const Icon = category.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-3xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: `${category.color}15`, color: category.color }}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-display font-black text-white">{category.label}</h3>
      </div>
      <div className="space-y-2">
        {category.skills.map((skill) => (
          <SkillProgress key={skill.name} {...skill} color={category.color} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { tx } = useLanguage()
  const s = tx.skills
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#080b12]/50"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="badge-work mb-6">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
            Technical <span className="text-gradient">Arsenal</span>.
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            A comprehensive suite of modern technologies and methodologies used to build high-performance enterprise solutions.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} category={cat} index={i} />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-grad-premium rounded-2xl flex items-center justify-center text-white shrink-0">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Continuous Innovation</h4>
              <p className="text-muted">Always staying ahead with the latest industry trends and emerging technologies.</p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-premium whitespace-nowrap"
          >
            See My Stack in Action
          </button>
        </motion.div>
      </div>
    </section>
  )
}
