import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const POST_LINKS = [
  'https://www.linkedin.com/feed/update/urn:li:activity:7438307192144977920/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
]

const READ_TIMES = ['3', '5', '4', '6', '4', '5']

const CATEGORY_COLORS = {
  JavaScript: '#f7df1e',
  React: '#61dafb',
  CSS: '#1572b6',
  Animation: '#a855f7',
  Tooling: '#10b981',
  Design: '#f59e0b',
  // Uzbek/Russian categories
  Animatsiya: '#a855f7',
  Vositalar: '#10b981',
  Dizayn: '#f59e0b',
  'Анимация': '#a855f7',
  'Инструменты': '#10b981',
  'Дизайн': '#f59e0b',
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
        background: 'rgba(8,11,18,0.6)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
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
          <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '36rem', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {b.subtitle}
          </p>
        </motion.div>

        {/* Posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {posts.map((post, i) => {
            const catColor = CATEGORY_COLORS[post.category] || '#00d4ff'
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
                  borderRadius: '1.25rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${catColor}25`
                  e.currentTarget.style.background = `radial-gradient(ellipse at 0% 0%, ${catColor}05, rgba(255,255,255,0.02))`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                }}
              >
                {/* Category + read time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem', borderRadius: 9999,
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
                    background: `${catColor}10`, border: `1px solid ${catColor}20`,
                    color: catColor,
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.25)', fontSize: '0.68rem' }}>
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
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                  {post.description}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>
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
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <BookOpen size={16} /> {b.follow}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
