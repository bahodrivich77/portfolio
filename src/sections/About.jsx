import { motion } from 'framer-motion'
import { MapPin, Calendar, Coffee, Heart, Rocket, Star } from 'lucide-react'
import Cmcoder from '../assets/Cmcoder.jpg'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const FACT_ICONS = [
  { key: 'location', icon: <MapPin size={18} className="text-[var(--linkedin-blue)]" /> },
  { key: 'experience', icon: <Calendar size={18} className="text-[var(--linkedin-blue-dark)]" /> },
  { key: 'energy', icon: <Coffee size={18} className="text-amber-600" /> },
  { key: 'stack', icon: <Heart size={18} className="text-rose-500" /> },
  { key: 'goal', icon: <Rocket size={18} className="text-emerald-600" /> },
  { key: 'hobby', icon: <Star size={18} className="text-amber-500" /> },
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

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >

            <div className="relative glow-border rounded-2xl overflow-hidden">
              <div className="glass rounded-2xl p-3 sm:p-5">

                <div className="relative rounded-xl overflow-hidden aspect-[3/4] sm:aspect-[4/3]">

                  <img
                    src={Cmcoder}
                    alt={tx.common.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      transition-transform
                      duration-500
                      hover:scale-[1.03]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--linkedin-blue-dark)]/70 to-transparent" />

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">

                    <div className="text-lg sm:text-xl font-bold">
                      {tx.common.name}
                    </div>

                    <div className="text-xs sm:text-sm text-[var(--linkedin-blue-light)]">
                      {a.role}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {facts.map(({ icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-3 sm:p-4 flex items-start gap-3 glow-border"
                >
                  <div className="mt-0.5">
                    {icon}
                  </div>

                  <div>
                    <div className="text-[var(--text-muted)] text-xs">
                      {label}
                    </div>

                    <div className="text-[var(--text-primary)] text-sm font-semibold mt-1">
                      {value}
                    </div>
                  </div>

                </motion.div>
              ))}

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >

            <div className="glass rounded-2xl p-5 sm:p-7 glow-border">

              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--linkedin-blue)]">
                {a.whoAmI}
              </h3>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">

                {bio1Parts[0].replace('{name}', tx.common.name)}

                <span className="text-[var(--linkedin-blue)] font-semibold">
                  {a.highlight}
                </span>

                {bio1Parts[1]}

              </p>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                {a.bio2}
              </p>

            </div>

            <div className="glass rounded-2xl p-5 sm:p-7 glow-border">

              <h3 className="text-lg sm:text-xl font-bold mb-6">
                {a.journey}
              </h3>

              <div className="relative">

                <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-[var(--linkedin-blue)]/25" />

                {a.timeline.map((item, i) => (

                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-3 sm:gap-5 pb-6 last:pb-0"
                  >

                    <div className={`relative z-10 w-9 h-9 rounded-full bg-gradient-to-br ${TIMELINE_COLORS[i % 4]} flex items-center justify-center`}>

                      <span className="text-white text-xs font-bold">
                        {item.year.slice(2)}
                      </span>

                    </div>

                    <div>

                      <div className="text-xs text-[var(--text-muted)] mb-1">
                        {item.year}
                      </div>

                      <div className="font-bold mb-1">
                        {item.title}
                      </div>

                      <div className="text-sm text-[var(--text-secondary)]">
                        {item.desc}
                      </div>

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