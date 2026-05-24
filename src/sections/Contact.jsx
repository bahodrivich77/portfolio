import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send, Github, Linkedin, Instagram, Mail, User,
  MessageCircle, CheckCircle2, AlertCircle, MapPin, Clock
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from '../components/SectionHeading'

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN || ''
const CHAT_ID = import.meta.env.VITE_CHAT_ID || ''

const SOCIALS = [
  {
    name: 'Telegram',
    handle: '@bahod1rovi_ch77',
    link: 'https://t.me/bahod1rovi_ch77',
    color: 'from-sky-500 to-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@bahod1rovi_ch77',
    link: 'https://www.instagram.com/bahod1rovi_ch77',
    color: 'from-pink-500 to-rose-600',
    icon: <Instagram size={20} />,
  },
  {
    name: 'GitHub',
    handle: 'bahodrivich77',
    link: 'https://github.com/bahodrivich77',
    color: 'from-gray-600 to-gray-800',
    icon: <Github size={20} />,
  },
  {
    name: 'LinkedIn',
    handle: 'Mirkarim Furqatov',
    link: 'https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/',
    color: 'from-[#0a66c2] to-[#004182]',
    icon: <Linkedin size={20} />,
  },
]

export default function Contact() {
  const { tx } = useLanguage()
  const c = tx.contact
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const text = c.telegramMsg
      .replace('{name}', form.name)
      .replace('{email}', form.email)
      .replace('{message}', form.message)

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
      })
      if (res.ok) {
        setStatus('ok')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    }

    setTimeout(() => setStatus(null), 5000)
  }

  const infoItems = [
    { icon: <MapPin size={16} className="text-[var(--linkedin-blue)]" />, label: c.info.location },
    { icon: <Clock size={16} className="text-[var(--linkedin-blue-dark)]" />, label: c.info.timezone },
    { icon: <CheckCircle2 size={16} className="text-green-600" />, label: c.info.open },
  ]

  return (
    <section id="contact" className="py-28 px-5 bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={<span className="gradient-text">{c.title}</span>}
          subtitle={c.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-7 glow-border"
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)]">{c.formTitle}</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={c.name}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--linkedin-blue)] focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={c.email}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--linkedin-blue)] focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 text-[var(--text-muted)]" size={18} />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={c.message}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--linkedin-blue)] focus:outline-none transition-all resize-none text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 btn-primary rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    {c.sending}
                  </>
                ) : (
                  <><Send size={17} /> {c.send}</>
                )}
              </motion.button>

              {status === 'ok' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-600 text-sm font-medium justify-center">
                  <CheckCircle2 size={16} /> {c.success}
                </motion.div>
              )}
              {status === 'err' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-600 text-sm font-medium justify-center">
                  <AlertCircle size={16} /> {c.error}
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <div className="glass rounded-2xl p-5 flex flex-wrap gap-4">
              {infoItems.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  {icon} {label}
                </div>
              ))}
            </div>

            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between glass rounded-xl p-4 group transition-all glow-border"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-md`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--text-primary)] text-sm">{s.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{s.handle}</div>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--linkedin-blue)] text-xs transition-colors">
                  {c.connect} →
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
