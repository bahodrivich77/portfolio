import { motion } from 'framer-motion'
import { Code2, Layout, Wrench, Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const MARQUEE_TECHS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Framer Motion', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Vite', 'Figma',
  'REST API', 'Node.js', 'VS Code', 'Vercel', 'React Router',
]

const CATEGORY_META = [
  { icon: <Code2 size={22} />, key: 'languages', skills: [
    { name: 'JavaScript', level: 88 }, { name: 'TypeScript', level: 72 },
    { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 90 },
  ]},
  { icon: <Layout size={22} />, key: 'frameworks', skills: [
    { name: 'React', level: 90 }, { name: 'Next.js', level: 78 },
    { name: 'Tailwind CSS', level: 92 }, { name: 'Framer Motion', level: 82 },
  ]},
  { icon: <Wrench size={22} />, key: 'tools', skills: [
    { name: 'Git / GitHub', level: 85 }, { name: 'Vite', level: 88 },
    { name: 'Figma', level: 70 }, { name: 'VS Code', level: 95 },
  ]},
  { icon: <Globe size={22} />, key: 'other', skills: [
    { name: 'Responsive Design', level: 93 }, { name: 'REST APIs', level: 80 },
    { name: 'UI/UX Fundamentals', level: 75 }, { name: 'Clean Code', level: 82 },
  ]},
]

function ProgressBar({ name, level }) {
  return (
    <div className="mb-4 last:mb-0">
      <span className="block text-sm text-[var(--text-primary)] font-medium mb-1.5">{name}</span>
      <div className="h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-[var(--linkedin-blue)]"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { tx } = useLanguage()
  const s = tx.skills
  const doubled = [...MARQUEE_TECHS, ...MARQUEE_TECHS]

  return (
    <section id="skills" className="py-28 overflow-hidden bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={<span className="gradient-text">{s.title}</span>}
        />

        <div className="relative mb-20">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="marquee-track">
              {doubled.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 mx-3 px-5 py-3 glass rounded-xl whitespace-nowrap text-[var(--text-secondary)] text-sm font-semibold hover:text-[var(--linkedin-blue)] hover:border-[var(--linkedin-blue)]/30 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--linkedin-blue)] shrink-0" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_META.map((cat, idx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-6 glow-border transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)]">
                  {cat.icon}
                </div>
                <span className="font-bold text-[var(--text-primary)]">{s.categories[cat.key]}</span>
              </div>
              {cat.skills.map((sk) => (
                <ProgressBar key={sk.name} name={sk.name} level={sk.level} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
