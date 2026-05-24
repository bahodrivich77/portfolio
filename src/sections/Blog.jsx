import { motion } from 'framer-motion'
import { ExternalLink, BookOpen, Calendar, Clock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const POST_LINKS = [
  'https://www.linkedin.com/feed/update/urn:li:activity:7438307192144977920/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
  'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
]

const READ_TIMES = ['3', '5', '4', '6', '4', '5']

export default function Blog() {
  const { tx } = useLanguage()
  const b = tx.blog

  const posts = b.posts.map((post, i) => ({
    id: i + 1,
    ...post,
    category: b.categories[i],
    date: b.dates[i],
    readTime: READ_TIMES[i],
    link: POST_LINKS[i],
  }))

  return (
    <section id="blog" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={b.eyebrow}
          title={<span className="gradient-text">{b.title}</span>}
          subtitle={b.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass p-6 flex flex-col h-full glow-border"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--linkedin-blue)]/10 text-[var(--linkedin-blue)] border border-[var(--linkedin-blue)]/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[var(--text-muted)] text-xs">
                  <Clock size={11} /> {post.readTime} {b.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3 leading-snug text-[var(--text-primary)] group-hover:text-[var(--linkedin-blue)] transition-colors">
                {post.title}
              </h3>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-5">{post.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-bold text-[var(--linkedin-blue)] hover:underline"
                >
                  {b.read}
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 btn-primary rounded-full text-sm"
          >
            <BookOpen size={17} />
            {b.follow}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
