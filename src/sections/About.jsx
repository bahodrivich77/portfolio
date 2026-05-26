import { motion } from 'framer-motion'
import { MapPin, Calendar, Coffee, Heart, Rocket, Star } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const FACT_ICONS = [
  { key: 'location',   icon: <MapPin   size={18} className="text-[var(--linkedin-blue)]"      /> },
  { key: 'experience', icon: <Calendar size={18} className="text-[var(--linkedin-blue-dark)]" /> },
  { key: 'energy',     icon: <Coffee   size={18} className="text-amber-600"                    /> },
  { key: 'stack',      icon: <Heart    size={18} className="text-rose-500"                     /> },
  { key: 'goal',       icon: <Rocket   size={18} className="text-emerald-600"                  /> },
  { key: 'hobby',      icon: <Star     size={18} className="text-amber-500"                    /> },
]

const TIMELINE_COLORS = [
  'from-[#0a66c2] to-[#004182]',
  'from-[#004182] to-[#0a66c2]',
  'from-[#70b5f9] to-[#0a66c2]',
  'from-[#0a66c2] to-[#70b5f9]',
]

export default function About() {
  const { tx } = useLanguage()
  const a = tx.about

  const facts = FACT_ICONS.map(({ key, icon }) => ({
    icon,
    label: a.facts[key].label,
    value: a.facts[key].value,
  }))

  const bio1Parts = a.bio1.split('{highlight}')

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={a.eyebrow}
          title={
            a.title.includes(' ')
              ? (
                <>
                  {a.title.split(' ')[0]}{' '}
                  <span className="gradient-text">
                    {a.title.split(' ').slice(1).join(' ')}
                  </span>
                </>
              )
              : <span className="gradient-text">{a.title}</span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* LEFT — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="relative glow-border rounded-2xl overflow-hidden">
              <div className="glass rounded-2xl p-3 sm:p-5">
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] sm:aspect-[4/3]">
                  {/* ✅ WebP + width/height + lazy (About is below fold) */}
                  <picture>
                    <source
                      srcSet="/Cmcoder-sm.webp 320w, /Cmcoder.webp 640w"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      type="image/webp"
                    />
                    <img
                      src="/Cmcoder.webp"
                      alt={tx.common.name}
                      width="640"
                      height="640"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xl font-bold text-[var(--text-primary)]">{tx.common.name}</div>
                    <div className="text-[var(--linkedin-blue)] text-sm">{a.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-3">
              {facts.map(({ icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-4 flex items-start gap-3 glow-border"
                >
                  <div className="mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <div className="text-[var(--text-muted)] text-xs">{label}</div>
                    <div className="text-[var(--text-primary)] text-sm font-semibold mt-0.5">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Bio + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Bio */}
            <div className="glass rounded-3xl p-7 glow-border">
              <h3 className="text-2xl font-bold mb-4 gradient-text">{a.whoAmI}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {bio1Parts[0]}
                <span className="text-[var(--linkedin-blue)] font-semibold">{a.highlight}</span>
                {bio1Parts[1]?.replace('{name}', tx.common.name)}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">{a.bio2}</p>
            </div>

            {/* Timeline */}
            <div className="glass rounded-3xl p-7 glow-border">
              <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)]">{a.journey}</h3>
              <div className="relative flex flex-col gap-0">
                <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-[var(--border)] opacity-60" />
                {a.timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 pb-7 last:pb-0"
                  >
                    <div className={`relative z-10 w-9 h-9 shrink-0 rounded-full bg-gradient-to-br ${TIMELINE_COLORS[i]} flex items-center justify-center shadow-md`}>
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    <div className="pt-1">
                      <div className="text-xs text-[var(--text-muted)] font-medium mb-1">{item.year}</div>
                      <div className="font-bold text-[var(--text-primary)] mb-1">{item.title}</div>
                      <div className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
