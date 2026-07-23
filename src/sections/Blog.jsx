import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const POST_LINKS = [
  'https://www.linkedin.com/feed/update/urn:li:activity:7438307192144977920/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
]

const READ_TIMES = ['8', '12', '9', '11', '6', '10']

const CATEGORY_COLORS = {
  // English categories
  'Cyber Security': '#34d399',
  'Cryptography': '#fbbf24',
  'Systems': '#34d399',
  'DevSecOps': '#fbbf24',
  'Frontend': '#34d399',
  'Compliance': '#fbbf24',

  // Uzbek categories
  'Kiberxavfsizlik': '#34d399',
  'Kriptografiya': '#fbbf24',
  'Tizimlar': '#34d399',
  'Standartlar': '#fbbf24',

  // Russian categories
  'Библиотека': '#34d399',
  'Архитектура': '#34d399',
  'Стандарты': '#fbbf24',
}

export default function Blog() {
  const { tx } = useLanguage()
  const b = tx.blog
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const posts = b.posts.map((post, i) => ({
    id: i + 1,
    ...post,
    category: b.categories[i],
    date: b.dates[i],
    readTime: READ_TIMES[i],
    link: POST_LINKS[i],
  }))

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        background: 'rgba(15,23,42,0.4)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,120,87,0.05) 0%, transparent 70%)',
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
            {b.eyebrow}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            <span className="text-gradient">{b.title}</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '36rem', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {b.subtitle}
          </p>
        </motion.div>

        {/* Posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {posts.map((post, i) => {
            const catColor = CATEGORY_COLORS[post.category] || '#34d399'
            return (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="glass-hover"
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155',
                  background: 'rgba(15, 23, 42, 0.75)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${catColor}30`
                  e.currentTarget.style.background = `radial-gradient(ellipse at 0% 0%, ${catColor}05, rgba(15, 23, 42, 0.85))`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#334155'
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)'
                }}
              >
                {/* Category + read time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem', borderRadius: '0.25rem',
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
                    background: `${catColor}12`, border: `1px solid ${catColor}30`,
                    color: catColor,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                    <Clock size={10} /> {post.readTime} {b.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontWeight: 800, fontSize: '1rem', color: '#fff',
                  marginBottom: '0.6rem', lineHeight: 1.4, flex: 1,
                  letterSpacing: '-0.01em',
                }}>
                  {post.title}
                </h3>

                {/* Description */}
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                  {post.description}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid #334155',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: catColor, fontSize: '0.78rem', fontWeight: 700 }}>
                    {b.read} <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.25rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <BookOpen size={16} /> {b.follow}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
